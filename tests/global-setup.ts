import { chromium, firefox, webkit, type FullConfig } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export default async function globalSetup(config: FullConfig) {
    const authDir = path.join(config.rootDir, 'playwright', '.auth');
    fs.mkdirSync(authDir, { recursive: true });

    const baseURL = config.projects[0].use.baseURL as string;

    const browsers = [
        { name: 'chromium', launcher: chromium },
        { name: 'firefox', launcher: firefox },
        { name: 'webkit', launcher: webkit },
    ];

    for (const b of browsers) {
        const browser = await b.launcher.launch();
        const page = await browser.newPage();

        await page.goto(baseURL);
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        await page.waitForURL(/inventory\.html/);

        await page.context().storageState({ path: path.join(authDir, `${b.name}.json`) });
        await browser.close();
    }
}