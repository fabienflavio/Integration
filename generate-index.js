const fs = require('fs');
const path = require('path');


const scssDir = path.join(__dirname, 'src/components'); // Dossier SCSS
const mainFile = path.join(__dirname, 'src/main.scss'); // Chemin de main.scss

// Lire tous les fichiers SCSS du dossier components/
const files = fs.readdirSync(scssDir)
  .filter(file => file.endsWith('.scss') && file !== '_index.scss') // Exclure _index.scss
  .map(file => {
    const cleanName = file.startsWith('_') ? file.substring(1) : file; // Retirer "_" pour l'import
    return `@import './components/${cleanName.replace('.scss', '')}';`; 
  });

const generatedContent = `/* Generate */\n${files.join('\n')}\n/* end */`;

// Lire le fichier main.scss s'il existe déjà
let existingContent = '';
if (fs.existsSync(mainFile)) {
  existingContent = fs.readFileSync(mainFile, 'utf8');
}

// Supprimer la section générée précédemment s'il y en avait une
const updatedContent = existingContent.replace(
  /\/\* Generate \*\/[\s\S]*?\/\*  end \*\//,
  ''
).trim();

// Écrire dans main.scss en gardant les anciens imports
fs.writeFileSync(mainFile, `${updatedContent}\n\n${generatedContent}`);

console.log('✅ main.scss mis à jour avec succès sans supprimer les autres imports ! 🎉');

// const scssDir = path.join(__dirname, './src/components');
// const mainFile = path.join(__dirname, 'src/main.scss');

//  // Chemin vers ton dossier SCSS
// const indexFile = path.join(scssDir, '_index.scss');
// console.log(scssDir,indexFile,__dirname);

// // Lire tous les fichiers SCSS du dossier
// const files = fs.readdirSync(scssDir)
//   .filter(file => file.endsWith('.scss') && file !== '_index.scss') // Exclure _index.scss
//   .map(file => {
//     const cleanName = file.startsWith('_') ? file.substring(1) : file; // Retirer "_" uniquement dans l'import
//     return `@import '${cleanName.replace('.scss', '')}';`; 
//   });


// console.log(files);
// // Écrire le fichier _index.scss
// fs.writeFileSync(indexFile, files.join('\n'));

// console.log('_index.scss généré avec succès !');