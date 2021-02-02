import Fingerprint2 from "@fingerprintjs/fingerprintjs";

export async function getFingerprint() {
    const components = await Fingerprint2.getPromise();
    const values = components.map(component => component.value);
    return String(Fingerprint2.x64hash128(values.join(''), 1011));
}
