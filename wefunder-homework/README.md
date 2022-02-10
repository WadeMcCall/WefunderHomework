This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Dependencies

Make sure you have the latest version of Node installed. I used npm as my package manager.

ghostscript must be installed. Install instructions can be found here: *https://www.ghostscript.com/doc/current/Install.htm* 
Tested on gs 9.55.0

to install node dependencies
```bash
npm i --save
```

inside next.config.js:

the variable UPLOAD_PATH must be set to a path on your local machine. Set it to the "public" folder found inside this project as that is an assumption this app makes.
GHOSTSCRIPT_COMMAND must be set as well. On windows its "gswin32.exe" for the 32-bit version. On linux, it should be just 'gs'

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
