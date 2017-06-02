import { DgFrontendPage } from './app.po';

describe('dg-frontend App', () => {
  let page: DgFrontendPage;

  beforeEach(() => {
    page = new DgFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
