import { expect } from 'chai';
import sinon from 'sinon';
import * as idbKeyval from './__mocks__/idb-keyval.js';
import * as cryptoUtils from '../src/utils/crypto.js';

describe('crypto.js', function () {
  const password = 'TestPassword$123';
  const salt = 'testSalt1234567';
  const plainText = 'Hello world';

  let key;
  let consoleLogStub;

  before(function () {
    // Silence console.log before tests
    consoleLogStub = sinon.stub(console, 'log');
  });

  after(function () {
    // Restore console.log after tests
    consoleLogStub.restore();
  });

  beforeEach(async function () {
    // Ensures that globalThis.window.crypto is defined
    if (!globalThis.window) {
      globalThis.window = {};
    }
    globalThis.window.crypto = globalThis.crypto;

    // Derive the key from the password and salt
    key = await cryptoUtils.deriveKey(password, salt, idbKeyval.set);
  });

  afterEach(async function () {
    // Clear the mock store
    await idbKeyval.clear();
  });

  it('should derive a key and store it in the mock store', async function () {
    const storedKey = await cryptoUtils.getKey(idbKeyval.get);

    expect(storedKey).to.exist;
    expect(storedKey.type).to.equal('secret');
    expect(storedKey).to.equal(key);
  });

  it('should return null if no key is stored', async function () {
    await idbKeyval.clear();
    const result = await cryptoUtils.getKey(idbKeyval.get);

    expect(result).to.be.null;
  });

  it('should encrypt content and return base64 iv and content', async function () {
    const { iv, content } = await cryptoUtils.encryptContent(plainText, key);

    expect(iv).to.be.a('string');
    expect(content).to.be.a('string');

    // Ensure the IV and content are base64 encoded
    expect(() => Buffer.from(iv, 'base64')).to.not.throw();
    expect(() => Buffer.from(content, 'base64')).to.not.throw();
  });

  it('should be able to decrypt encrypted content back into the original plaintext', async function () {
    const { iv, content } = await cryptoUtils.encryptContent(plainText, key);
    const decrypted = await cryptoUtils.decryptContent(content, iv, key);
    
    expect(decrypted).to.equal(plainText);
  });

  it('should throw an error when decrypting with the wrong IV', async function () {
    const { iv, content } = await cryptoUtils.encryptContent(plainText, key);

    let wrongIv = "abcd";

    try {
      await cryptoUtils.decryptContent(content, wrongIv, key);
      expect.fail('Expected an error to be thrown');
    } catch (err) {
      expect(err).to.not.be.null;
    }
  });

  it('should throw an error when decrypting with the wrong key', async function () {
    const { iv, content } = await cryptoUtils.encryptContent(plainText, key);

    // Derive the wrong key using the wrong password
    let wrongKey = await cryptoUtils.deriveKey('wrongPassword$123', salt, idbKeyval.set);

    try {
      await cryptoUtils.decryptContent(content, iv, wrongKey);
      expect.fail('Expected an error to be thrown');
    } catch (err) {
      expect(err).to.not.be.null;
    }
  });
});