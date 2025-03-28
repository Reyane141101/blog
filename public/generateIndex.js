const fs = require('fs');
const path = require('path');

// Le dossier contenant les fichiers YAML
const previewsFolder = path.join(__dirname, 'articles/preview');

// Liste tous les fichiers du dossier
fs.readdir(previewsFolder, (err, files) => {
  if (err) {
    console.error('Erreur lors de la lecture du dossier:', err);
    return;
  }

  const yamlFiles = files.filter(file => file.endsWith('.yaml'));

  const indexContent = JSON.stringify(yamlFiles, null, 2);

  fs.writeFile(path.join(previewsFolder, 'index.json'), indexContent, (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture du fichier index.json:', err);
    } else {
      console.log('index.json a été généré avec succès.');
    }
  });
});
