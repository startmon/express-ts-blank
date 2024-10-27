import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'node:path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function addJsExtensions(directory) {
    const files = readdirSync(directory);
    
    files.forEach(file => {
        const filePath = join(directory, file);
        const stat = statSync(filePath);
        
        if (stat.isDirectory()) {
            addJsExtensions(filePath);
        } else if (file.endsWith('.js')) {
            let content = readFileSync(filePath, 'utf8');
            
            // Replace imports without extensions
            content = content.replace(/from ['"]([^'"]+)['"]/g, (match, p1) => {
                if (p1.startsWith('.') && !p1.endsWith('.js')) {
                    return `from '${p1}.js'`;
                }
                return match;
            });
            
            // Replace dynamic imports without extensions
            content = content.replace(/import\(['"]([^'"]+)['"]\)/g, (match, p1) => {
                if (p1.startsWith('.') && !p1.endsWith('.js')) {
                    return `import('${p1}.js')`;
                }
                return match;
            });
            
            writeFileSync(filePath, content);
        }
    });
}

// First compile with tsc
execSync('tsc', { stdio: 'inherit' });

// Then transform the output
addJsExtensions('./dist');

console.log('Build completed with .js extensions added');