# GRAM™ codebase

This repository holds the code for GRAM™'s proof of concept waste management marketing website and web-app. More information can be found in the video below.

## Website code

- Run `make` to build the webite and then navigate to the [dev server](http://localhost:3000) (preferably from an incognito tab) to view the website. You need to have GNU make installed to do this. If not:

``` shell
npm install
npm run dev
```

- [To view the marketing website](https://gram-lemon.vercel.app/)

- [To view the page for our main product](https://gram-lemon.vercel.app/mk1)

- The video can be found [here](https://drive.google.com/file/d/1Q179cT5rzPR2jh5_pEYfEHdTiBIxEmny/view) or [here](https://www.youtube.com/watch?v=qugjc1h1NWQ)

- To view the web app, you can sign in using:

  - username: `some@example.com`
  - password: `123456`

## Server code

- Run `python3 -m venv venv`
- Then run `source venv/bin/activate` on Unix based systems. `.\venv\Scripts\activate` if on Windows.
- Finally, run `pip install -r requirements.txt`

- Server can then be run using `python3 wsgi.py`. It has been configured [here](https://gram-backend.vercel.app/).
## Sensor code

- Run `python3 -m venv venv`
- Then run `source venv/bin/activate` on Unix based systems. `.\venv\Scripts\activate` if on Windows.
- Finally, run `pip install -r requirements.txt`
- Code for individual sensors can be found in `sensor-code/sensor.py`. There are unused sensors commented in the code.
- The bin.service file was how we set up our daemon to auto run the code
- `sensor-code/data.py` contains code for communication between sensor nodes and the database.
