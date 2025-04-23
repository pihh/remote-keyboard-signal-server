const admin = require("firebase-admin");
const cert = {
  type: "service_account",
  project_id: "portfolio-8bb32",
  private_key_id: "7e69b3c3acec6a44d3eb563e5509094a76575a97",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDI+LXNbWO5IoUw\nZ2pJBRviMHugt5lr15cbMUjxDITn97m/rVYzdLts+frj5WMtlWNhOc17ga4BeF3u\nJCSgbbdbcT1qYr3E5utl24/kO3eVrk9T2TISA3ymdBAk7cR05UwEsuZKFmmeHPlN\nxDjsPpjkRPYTT/h9KeJMBiOhsZWlssOTzrQaRi5dUi+hfpdvpAT3DTlTfvg1bzE9\nmyhBbSWmMkdQeXt2IjOQe9M43SV2Nc2VnXY6ZYYmejOjlTGL0n98kISlTWa93jcm\n23wFKZEKwDt9u40m0pJ4kRcAgABRl3RgIx0+QVtV4bizSEWIuxj0n+lZea7C9+X3\nwIz3E2OxAgMBAAECggEABFmRwc0E1AyBun76h3MTW+11t5BRw0pKzH1gGUuOkuDD\nRflP/NQhfGXavtUHtQRfPsr7/hjb9c8vpUhl/IzzY4jLbgKOHfVrkexTLHr3Byfb\nMrLoSQiHSakIcmwtDOSrpQxkPKVIivIQmVTOcJqYP5SYiOl5tOfTrJaTbdwEo631\nh1W4g8GTdhdrlJ+3uRA7C1Z78+lHHKXIcd2AI192LxAz0h89xJyl6eWacnVe9isT\nEQB4zR9bN5gejMW3eUk2Io8IdDIV2YbwP7m719nK7pHH4vRxcHrWqNIZ2hj2kbSF\nXTy2zFy+KQ98bmoV24VisqI9aZmwVmvHMhQpFleQQwKBgQDrbaqSHjwUxc/1GiqJ\n3koP2yo36sbKPcOtcvC4dXgnVt6kI4YKC++vDon548GpFrc1mUAOz00HomDVBLbS\nMwVhiqJZv9zmwxc3M7FwXFR6biSWrthOJihbm4tBlNf+eECvl98x4SE6g3GwsgtX\nTJ+oGlZCpkIvpyjOb9Wciep3owKBgQDaiEXogh0w17Agto7qJPx0DxFst/7UjpBW\nSS/OHch/KaDmhgC6QwzLVbnXJ9d2UfPbvUhqG7/pRjoCVBrgYlU1FkPjv7ayClYQ\nhhJkKnorZBTt2176nhOs3RDmzN++O1Gz86efu2o1QDqFz+A1gI11uNJCqDCPPbeE\n7ElL1c58mwKBgGuzXq27sSabm9f34W/yxhTc4UJ1X/2TJdpKU78+1fnBLtcN/TrJ\nXRvLXel4fNa6spONiRV9VjLg4MVyg6RDfPmzbzP5prfWld9GAa1yP59GlextDj0q\nDZpi3ODik7ExF/58TrnF0OqwySjZOoD0Z7GCYuXYozyjjvJpjOIw4ZdbAoGAVTgx\nMuOSqJpj983ZW5vCyyuZGvGBsbhKtythNhrNNjGwqlT1ca12DtFGYI4L6vs4gqeE\n1sQtibW2J3RO6tPN8J7XKLh5cWKwf08ZWvBppgQoWT1kA42jlJS845RfaFrPmMJa\nyuKWH2AFsmsHPzX7dD332MCn9yQVLgPK7YTaOiMCgYEAhfRr/1Lppym6coeGEhM3\nouh8fmAoyDJWQldKJcShiIxtSl9G3brvod5ELSKR8Q7BbIr2MsMyHOars6lggKSK\nZ7IVzNMkSlBGLrMKpkzqJx3HhB7SU7EGU9LJFLwSA3p6e4kT3ZbgOJgTcf5EXP5k\nX7mGaXG5k7zYrbCu+zK+o9w=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fbsvc@portfolio-8bb32.iam.gserviceaccount.com",
  client_id: "111538327326289779961",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40portfolio-8bb32.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(cert),
});

const db = admin.firestore();
const fcm = admin.messaging();

module.exports = { db, fcm };
