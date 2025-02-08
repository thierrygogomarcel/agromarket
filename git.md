
node scripts/convertToVue.js

https://bolt.new/~/github.com/thierrygogomarcel/gogomarket

npm install consola@^3.0.0 dotenv express mongoose jsonwebtoken bcrypt dotenv && npm install --save-dev nodemon typescript @types/express @types/jsonwebtoken @types/node && npm install cross-env --save-dev && npm install dotenvnpm remove consola
npm install 


echo "# gogomarket" >> README.md
git init
git add README.md
git commit -m "publier une offre, design ajouter"
git branch -M main
git remote add origin https://github.com/thierrygogomarcel/gogomarket.git
git push -u origin main
 


git status 
git add . 
git commit -m "modifier avec bolt github.com/thierrygogomarcel/gogomarket " 
git push origin main

 
Tu peux comparer ton fichier local avec la version avant la mise à jour via : 
git diff origin/main -- server/api/auth/login.post.ts 


Si tu veux revenir à la version avant le git pull, fais : 
git reset --hard HEAD~1


ngrok http 3000

ngrok http --scheme=http 3001

ngrok diagnose 

ngrok http 3001 --log=stdout