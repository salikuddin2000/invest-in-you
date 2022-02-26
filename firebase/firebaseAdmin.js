// import admin from "firebase-admin";

// export const verifyIdToken = (token) => {
//     const firebasePrivateKey ="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDG1hFJD/F4tzTX\ncCTKLofLidT6toddbUqiNECWHYlHTTrAGRjra7ttsZ5qyCfsEafuMlMsMVVL5gZI\nFqo4MTCLDcJCQdjs/0Qa67A8dK/TFc3MraIXj+J/4Xoq4b28itWynOTLoxKqRaJL\nm7xLcsbKDe0jsF7uLn/kxbYi6z5LSLw3ytBCjsOPrjHGJe2zOXgEXkKWT8HE/CFn\nz/HzGXzd6cUqKHbF42H1QR9kL1B62C87PNfJM2Ec65nYRfxDlHOgvfSgbmE+0Qqr\nEBPEtefJ1wergHcolrfPMmrqm74hXFYZmJyHByFtSlXRtresMQL+TRALgyeN759i\nrM/XppGZAgMBAAECggEAGOfdeGpf08AXBVlNsmmLpuoX3GOapxA2hgTHhkYi2OSK\nlF9QaMSw0HesITH7Fi3L/CEfm+x+A6jHZqY4Ihu/Odu6VnRLCLycukaFZ70x/N3B\nTn79S7hBJcWHePGXw5McW2gdnIhLoTphrtjOCCFTVyHRb2P7MBhw+qXtP4h54BH+\nrBMDKu8zYrACq2aVJO2p5Kg/lLnsFaW6r4WTy2WTxZlPMCkCRcoS4/VjfyYlP0dH\nbF/SkZE7Oo8otc7n2ceKk6r09GTzejmlKGbm8LUrLFSS1cRt810qwGCLnqbCGz73\n1MCKNRVKrUnkqjhAC4T8+S5NAXvPVnPwblWantcA9QKBgQDvA6lbbaXF+b27KgEH\nrZJHy43ihEjeHHm675/NMYOVAtFjNCxDabnVp9LtBYvcqidbSBS1BoITl8l1pjCy\n7T6P4c8ryBV3A1l6XxNhE+JskDqcpYahja/5WPCQTm41G8dZ+T/IEuIMCdz70Plx\n6gTf+phi9LYYPCqKIpJS4a+oDwKBgQDU93Q27jiYvGjbyxnvfImRYqEHUWE1MKOS\nLvTxrO3nwb00GpctkNrItRTmKtHYABNx8f7JLylHag1tC6TH1acdvnLFvy8JgXFo\ngMAwGVMYYiDrTxjfX11ufGQ4YMoPzfHyH+YZulvKPrRMrulsL5m82KFd2p6BewT0\nP3KOiRPD1wKBgQCEh2A5vPOlcdQdWq4Vhs3Ml3bF+hm5Zsqst7/A9EqErnpR6pT8\nkDwl1xeiq2eg5IxMFgy9T62ClbB0VsE8BUaiW1AXc6tLQYU00FEbi/4JunN1dmbP\nX5QKy6EgMwzyz8NbBVSzaJ0Eldd9naMi4eLwGrCydgQeLgZcb8z4vgE7SwKBgEaV\ncU4XbGiq4XIfgYwPUaT+9HHxde9kHIKBz6sd7ofGfYf8XCi8/tZQtgmHHZ+ifs9g\nLlrNp7fEnYiLuGSHGmlQSsfhkpxq64SAT7JhYloNg+2ZfJvkBpps3eaVpcLRNiRS\nkDfsvSlt2OIlgrXZnPGrNuhdYfV2KXEuajB1nDhnAoGAAe7UAUd8Go+XuBtjyDdE\n/2NQ1eq6P4o5r6WDB2WxkN+FMwnfu9DvKHKXdAQwxvKTsamolHTnTYjGlxVKWYrb\nKN6ci+0cx4L6uiiEO89XoM2HkmvG34m9A+AUN56lWP2SvjqBLY8vKXFwLwbDFtCJ\nCXTOxcGlhLIv+ymdeQ5uOAA=\n-----END PRIVATE KEY-----\n"

//     if (!admin.apps.length) {
//         admin.initializeApp({
//             credential: admin.credential.cert({
//                 projectId:  "test-app-40406",
//                 clientEmail: "firebase-adminsdk-f36uf@test-app-40406.iam.gserviceaccount.com",
//                 // https://stackoverflow.com/a/41044630/1332513
//                 privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
//             }),
//             databaseURL: "https://test-app-40406-default-rtdb.firebaseio.com",
//         })
//     }

//     return admin
//         .auth()
//         .verifyIdToken(token)
//         .catch((error) => {
//             throw error
//         })
// }