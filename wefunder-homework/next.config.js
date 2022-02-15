/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    UPLOAD_PATH:"C:\\Users\\dance\\OneDrive\\Desktop\\React\\Wefunder\\WefunderHomework\\wefunder-homework\\public\\",
    GHOSTSCRIPT_COMMAND:"gswin32.exe", // 'gs' on linux
    AcceptedFileTypes:"pdf" // seperate file types with a space
  }
}

module.exports = nextConfig
