/* global process */
import fs from 'fs';
import path from 'path';

const apiUrlLine = "const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';\n";

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    if (content.includes('http://localhost:4000')) {
        // Change http://localhost:4000 to ${API_URL}
        content = content.replace(/'http:\/\/localhost:4000([^']*)'/g, '`${API_URL}$1`');
        content = content.replace(/`http:\/\/localhost:4000([^`]*)`/g, '`${API_URL}$1`');

        // Add const API_URL = ... after imports
        if (!content.includes('const API_URL = import.meta.env.VITE_API_URL')) {
            const lines = content.split('\n');
            let lastImportIndex = -1;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].startsWith('import ')) {
                    lastImportIndex = i;
                }
            }
            
            if (lastImportIndex !== -1) {
                lines.splice(lastImportIndex + 1, 0, '\n' + apiUrlLine);
                content = lines.join('\n');
            } else {
                content = apiUrlLine + '\n' + content;
            }
        }
        
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
}

const directories = [
    'src/pages',
    'src/components'
];

directories.forEach(dir => {
    const fullPath = path.join(process.cwd(), dir);
    if (fs.existsSync(fullPath)) {
        const files = fs.readdirSync(fullPath);
        files.forEach(file => {
            if (file.endsWith('.jsx')) {
                processFile(path.join(fullPath, file));
            }
        });
    }
});
