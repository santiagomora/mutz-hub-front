#    the mutz hub. - front end APP
##   We love Mozzarella
### to deploy on local development mode:
clone the repository using 

git clone git@github.com:santiagomora/mutz-hub-front.git --branch local or <br/>
git clone https://github.com/santiagomora/mutz-hub-front.git --branch local

cd mutz-hub-front

npm install

npm run dev

this runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### to deploy on production
The branch master is ready for deployment on Heroku <br/>
To deploy on any server: 

git clone git@github.com:santiagomora/mutz-hub-front.git or <br/>
git clone https://github.com/santiagomora/mutz-hub-front.git

cd mutz-hub-front

npm install

npm run build

npx serve /build

edit package json to set the homepage of your project <br/>
add env variable GENERATE_SOURCEMAP=false

Remember to install the api, available on [this repo](https://github.com/santiagomora/mutz-hub-back) <br/>
and set up to run on 127.0.0.1:8000

ENJOY!
