;
!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {}, n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "13be8a21-720b-4bf8-aeef-0fc071bbcb67", e._sentryDebugIdIdentifier = "sentry-dbid-13be8a21-720b-4bf8-aeef-0fc071bbcb67");
  } catch (e2) {
  }
}();
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import pkg from "firebase-admin";
import "./_sentry-release-injection-file.js";
const FB_PROJECT_ID = "ciphersaga-dev";
const FB_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC/6jKoeXK7VmsD\nGvsDlpF9xCcChpR1U9qJTeMFbahhRdsxq0sIZUiJFp1lTOabYO/y0aOtTN3gKmRn\nM7C04Q/J6TOr3uUAFfhKgbYYdII/p+WcoFwRP+8NSt2YmvOxoa8VZ8n+1hKWnsjQ\nwvKT3rhTy6W4/r0uXgKWYbxyWIwiwN4pJ6JC0e+08FHOmvROih0dKAv51/I2bsoi\nwsIFKc7UJhC1U3ON/78i6Jp4Dao0NsrrBy3Gc6Wf+Vxx+j3I1E4RZ9PlAxHYJ8YG\n8t3uixEfWtQ3ArE5WtcOcScnaAcHtA1PgQCNhiPzl6djKSkBh5Q636W6PDlzWsfd\nTl8bdQPnAgMBAAECggEAXUBquhM9LQs6N0mSY7VzX5WC0Qbctz/2BdabM6WLdiyP\n7AwMCvnP65DaDQF3YlORdD7qVchuXUCsBbuHpvRfDCCs81v8kPSb73Qkq7BdI5ot\nB1SiN92FhkN09nSAajUikneanqGdaaOg91NqtHA5x7nB/miFOzUB89lszHD7Mt0F\nfON3/DkoEC3aEfmVGsWTOFkfAu5t8tivmfqU9dLLWmKqFVsQ8V8n0L8VyHUL6PXf\nyeCKHAF2YiCSC+ARqOTKyzdsdciXe6/3HiV5Jkfh1eoy73KCUUaelZ4hFrGUmHTu\nsTGiq1Y1FubWPzRzYQMT+9WElL0vAH40Y+NSKVtDXQKBgQDuVOC+ggbmzyB5GbEc\nZbaiXHKhdkXV0Zm2ls7bOQEeMw50vsg3Q2t42WEV2th/3Oe1pFs865fv7Ppbia97\n4AbY4MsPCnrDyvH5vl9ojbFRxHpkj+vImk/CMbBYb5gk3DW7DS05K4wgtLnYFN6J\nBUAJ2hdW45DJRlqvYzpoxXH5HQKBgQDOJGkhCZDLH3HT4Gle1puuL/Ra470Qib4b\n8jloZWGoSYvyYgJHlCPOeUpN6G0y4OQmRMSMbCnsNySDLk2lsESq5RFKLgu8yJCj\nD/K3DCJ40V5DyU7nFFmOUpiZNBEFjbTbbbtHZJs7kgXrZNwOEp3IngECF3A0VOFp\nVDp1/7ml0wKBgQCU90J+cQFlVMNkThWwvTaZZxVTLHzb96WPRdXHmmrDeIAponG8\ncQyEvcJ8CYzW5rmBhFhuzIbsNQALJRUlZVKCToc9QHyZUolKY5542E+j3x3tKzPh\n7+m4ZJxnumCrcWS4JLVGjZyJeMzMbcbmd/yd6844xgZid/IIvAnvILJrVQKBgCHF\nw1d/SrKMj0iIHptEC7No9d6iKwp3lqbbc15QJcS9b+kg94Ckm40rP+otpx5Ly/Ud\nFRpwahniGuBHCL+ZdlaNOtztWEzwiwm8BibJHSiwHIJ8i6m+IsH3dDq9VgCT68p7\nWtBigjArRz7+gjLoB+OjR0UBdAeO1HM+Mmm8oLyzAoGAaANXIeIyg48A0dk/3Okx\ncULgXCG66lfmuwK5lm+J9EyTmJjd4tvsHykO+jHrMnkkwfYRi9odLZwnx7CijIvd\n+Vk8LVbn7N+U8f9fIx9OxHfx5sMI74V8Bl6lzdjIEC6AMvJ1onJFzIIMl/72H6av\nqZ227ww9k5GQmj2oybFHaKI=\n-----END PRIVATE KEY-----\n";
const FB_CLIENT_EMAIL = "firebase-adminsdk-fbsvc@ciphersaga-dev.iam.gserviceaccount.com";
try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY
    })
  });
} catch (err) {
  if (!/already exists/u.test(err.message)) {
    console.error("Firebase Admin Error: ", err.stack);
  }
}
const adminDB = getFirestore();
const adminAuth = getAuth();
export {
  adminAuth as a,
  adminDB as b
};
//# sourceMappingURL=admin.js.map
