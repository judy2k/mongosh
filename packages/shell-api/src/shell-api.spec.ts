import ShellApi from './shell-api';
import { expect } from 'chai';

describe('ShellApi', () => {
  describe('#help', () => {
    const shellApi = new ShellApi();

    it('returns the translated text', () => {
      expect(shellApi.help()).to.equal('Welcome to the new MongoDB Shell!');
    });
  });
});
