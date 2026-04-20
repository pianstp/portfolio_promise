# Assets Folder

Place your files here:

## Profile Photo
- File name: `profile.jpg` (or `profile.png`)
- Recommended size: 800×800px minimum, square crop
- In `index.html`, inside `.avatar-container`, uncomment the `<img>` tag and remove the `.avatar-placeholder` div

## Resume PDF
- File name: `resume.pdf`
- In `script.js`, set `hasResume = true` in the download button handler (around line 274)
- The "Resume" button in the hero will then directly download the PDF

## Example directory structure:
```
promise/
├── assets/
│   ├── profile.jpg      ← your headshot
│   └── resume.pdf       ← your CV / resume
├── index.html
├── style.css
└── script.js
```
