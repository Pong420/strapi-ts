require('mongoose');

process.env.NODE_OPTIONS = '--enable-source-maps';

jest.useFakeTimers();
jest.setTimeout(30000);
