// function decodeBase64(b64: string): Uint8Array {
//   const b64Web = b64.replace(/-/g, "+").replace(/_/g, "/");
//   const binString = atob(b64Web);
//   const size = binString.length;
//   const bytes = new Uint8Array(size);
//   for (let i = 0; i < size; i++) {
//     bytes[i] = binString.charCodeAt(i);
//   }
//   return bytes;
// }

// const buffToBase64 = (buff: number[] | Uint8Array) =>
//   btoa(String.fromCharCode.apply(null, buff));

// const base64ToBuf = (b64: string) =>
//   Uint8Array.from(atob(b64), (c) => c.charCodeAt(null));

// const encoder = new TextEncoder();
// const decoder = new TextDecoder();

// const getPasswordKey = async (password: any) =>
//   await window.crypto.subtle.importKey(
//     "raw",
//     encoder.encode(password),
//     "PBKDF2",
//     false,
//     ["deriveBits", "deriveKey"],
//   );

// const deriveKey = async (passwordKey: any, salt: any, keyUsage: any[]) =>
//   await window.crypto.subtle.deriveKey(
//     {
//       name: "PBKDF2",
//       salt: salt,
//       iterations: 250000,
//       hash: "SHA-256",
//     },
//     passwordKey,
//     { name: "AES-GCM", length: 256 },
//     false,
//     keyUsage,
//   );

// export async function encryptData(
//   secretData: string | undefined,
//   password: string | undefined,
// ) {
//   try {
//     const salt = window.crypto.getRandomValues(new Uint8Array(16));
//     const iv = window.crypto.getRandomValues(new Uint8Array(12));
//     const passwordKey = await getPasswordKey(password);
//     const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);
//     const encryptedContent = await window.crypto.subtle.encrypt(
//       {
//         name: "AES-GCM",
//         iv: iv,
//       },
//       aesKey,
//       encoder.encode(secretData),
//     );

//     const encryptedContentArr = new Uint8Array(encryptedContent);
//     let buff = new Uint8Array(
//       salt.byteLength + iv.byteLength + encryptedContentArr.byteLength,
//     );
//     buff.set(salt, 0);
//     buff.set(iv, salt.byteLength);
//     buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
//     const base64Buff = buffToBase64(buff);
//     return base64Buff;
//   } catch (e) {
//     console.log(`Error - ${e}`);
//     return "";
//   }
// }

// export async function decryptData(
//   encryptedData: string,
//   password: string | undefined,
// ) {
//   try {
//     const encryptedDataBuff = base64ToBuf(encryptedData);
//     const salt = encryptedDataBuff.slice(0, 16);
//     const iv = encryptedDataBuff.slice(16, 16 + 12);
//     const data = encryptedDataBuff.slice(16 + 12);
//     const passwordKey = await getPasswordKey(password);
//     const aesKey = await deriveKey(passwordKey, salt, ["decrypt"]);
//     const decryptedContent = await window.crypto.subtle.decrypt(
//       {
//         name: "AES-GCM",
//         iv: iv,
//       },
//       aesKey,
//       data,
//     );
//     return decoder.decode(decryptedContent);
//   } catch (e) {
//     console.log(`Error - ${e}`);
//     return "";
//   }
// }

// for large strings, use this from https://stackoverflow.com/a/49124600
const buff_to_base64 = (buff) =>
  btoa(
    new Uint8Array(buff).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      "",
    ),
  );

const base64_to_buf = (b64) =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(null));

function decodeBase64(b64: string): Uint8Array {
  const b64Web = b64.replace(/-/g, "+").replace(/_/g, "/");
  const binString = atob(b64Web);
  const size = binString.length;
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i);
  }
  return bytes;
}

const enc = new TextEncoder();
const dec = new TextDecoder();

const getPasswordKey = (password) =>
  window.crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);

const deriveKey = (passwordKey, salt, keyUsage) =>
  window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 250000,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    keyUsage,
  );

export async function encryptData(secretData, password) {
  try {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, ["encrypt"]);
    const encryptedContent = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      aesKey,
      enc.encode(secretData),
    );

    const encryptedContentArr = new Uint8Array(encryptedContent);
    let buff = new Uint8Array(
      salt.byteLength + iv.byteLength + encryptedContentArr.byteLength,
    );
    buff.set(salt, 0);
    buff.set(iv, salt.byteLength);
    buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
    const base64Buff = buff_to_base64(buff);
    return base64Buff;
  } catch (e) {
    console.log(`Error - ${e}`);
    return "";
  }
}

export async function decryptData(encryptedData, password) {
  try {
    const encryptedDataBuff = await decodeBase64(encryptedData);
    console.log("eb", encryptedDataBuff);
    const salt = encryptedDataBuff.slice(0, 16);
    const iv = encryptedDataBuff.slice(16, 16 + 12);
    const data = encryptedDataBuff.slice(16 + 12);
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, ["decrypt"]);
    const decryptedContent = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      aesKey,
      data,
    );
    return dec.decode(decryptedContent);
  } catch (e) {
    console.log(`Error - ${e}`);
    return "";
  }
}
