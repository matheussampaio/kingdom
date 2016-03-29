describe(`KingdomAlgorithmsService`, () => {

  beforeEach(() => {
    module(`kingdom`);
  });

  let KingdomAlgorithmsService = null;
  let _ = null;

  beforeEach(inject((_KingdomAlgorithmsService_, _$window_) => {
    KingdomAlgorithmsService = _KingdomAlgorithmsService_;
    _ = _$window_._;
  }));

  describe(`#gravity`, () => {
    it(`should work move some cells`, (done) => {
      const board = [
        [`f`, ``, `h`, `f`, `h`, `w`, `w`, `f`],
        [``, ``, `w`, ``, `f`, `t`, `f`, `t`],
        [``, ``, `h`, ``, `t`, `p`, `w`, `t`],
        [``, `g`, `h`, ``, `f`, `h`, `f`, `s`],
        [``, ``, `w`, ``, `f`, `t`, `w`, `t`],
        [``, ``, `s`, ``, `t`, `s`, `h`, `g`],
        [``, ``, `f`, `h`, `g`, `g`, `t`, `g`],
        [``, `f`, `s`, `t`, `w`, `h`, `p`, `t`]
      ];

      const resultExpected = [
        [``, ``, `h`, ``, `h`, `w`, `w`, `f`],
        [``, ``, `w`, ``, `f`, `t`, `f`, `t`],
        [``, ``, `h`, ``, `t`, `p`, `w`, `t`],
        [``, ``, `h`, ``, `f`, `h`, `f`, `s`],
        [``, ``, `w`, ``, `f`, `t`, `w`, `t`],
        [``, ``, `s`, `f`, `t`, `s`, `h`, `g`],
        [``, `g`, `f`, `h`, `g`, `g`, `t`, `g`],
        [`f`, `f`, `s`, `t`, `w`, `h`, `p`, `t`]
      ];

      KingdomAlgorithmsService
        .gravity({ board })
        .then((result) => {
          expect(_.isEqual(result, resultExpected)).toBeTruthy();
          done();
        });
    });

    it(`shouldn't modify the parameters`, (done) => {
      const board = [
        [`f`, ``, `h`, `f`, `h`, `w`, `w`, `f`],
        [``, ``, `w`, ``, `f`, `t`, `f`, `t`],
        [``, ``, `h`, ``, `t`, `p`, `w`, `t`],
        [``, `g`, `h`, ``, `f`, `h`, `f`, `s`],
        [``, ``, `w`, ``, `f`, `t`, `w`, `t`],
        [``, ``, `s`, ``, `t`, `s`, `h`, `g`],
        [``, ``, `f`, `h`, `g`, `g`, `t`, `g`],
        [``, `f`, `s`, `t`, `w`, `h`, `p`, `t`]
      ];

      KingdomAlgorithmsService
        .gravity({ board })
        .then((result) => {
          expect(_.isEqual(board, result)).toBeFalsy();
          done();
        });
    });
  });

  describe(`#consumeRow`, () => {
    it(`shouldn't consume the cells`, (done) => {
      const board = [
        [`f`, `g`, `h`, `f`, `h`, `w`, `w`, `f`],
        [`p`, `t`, `w`, `f`, `f`, `t`, `f`, `t`],
        [`t`, `t`, `h`, `s`, `t`, `p`, `w`, `t`],
        [`f`, `g`, `h`, `h`, `f`, `h`, `f`, `s`],
        [`s`, `p`, `w`, `g`, `f`, `t`, `w`, `t`],
        [`g`, `p`, `s`, `p`, `t`, `s`, `h`, `g`],
        [`t`, `f`, `f`, `h`, `g`, `g`, `t`, `g`],
        [`p`, `f`, `s`, `t`, `w`, `h`, `p`, `t`]
      ];

      KingdomAlgorithmsService
        .consumeRow({ board })
        .then((result) => {

          expect(result.change).toBeFalsy();
          expect(_.isEqual(board, result.board)).toBeTruthy();
          expect(_.isEqual({}, result.production)).toBeTruthy();

          done();
        });
    });

    it(`should consume the cells`, (done) => {
      const board = [
        [`f`, `g`, `h`, `f`, `h`, `w`, `w`, `f`],
        [`h`, `h`, `h`, `h`, `w`, `t`, `t`, `t`],
        [`t`, `t`, `h`, `s`, `t`, `p`, `w`, `t`],
        [`f`, `g`, `h`, `h`, `f`, `h`, `f`, `s`],
        [`s`, `p`, `w`, `g`, `g`, `g`, `w`, `t`],
        [`g`, `p`, `s`, `p`, `t`, `s`, `h`, `g`],
        [`t`, `f`, `f`, `h`, `g`, `g`, `t`, `g`],
        [`p`, `f`, `s`, `t`, `w`, `h`, `p`, `t`]
      ];

      const expectedBoard = [
        [`f`, `g`, `h`, `f`, `h`, `w`, `w`, `f`],
        [``, ``, ``, ``, `w`, ``, ``, ``],
        [`t`, `t`, `h`, `s`, `t`, `p`, `w`, `t`],
        [`f`, `g`, `h`, `h`, `f`, `h`, `f`, `s`],
        [`s`, `p`, `w`, ``, ``, ``, `w`, `t`],
        [`g`, `p`, `s`, `p`, `t`, `s`, `h`, `g`],
        [`t`, `f`, `f`, `h`, `g`, `g`, `t`, `g`],
        [`p`, `f`, `s`, `t`, `w`, `h`, `p`, `t`]
      ];

      const expectedProduction = {
        g: 3,
        t: 3,
        h: 4
      };

      KingdomAlgorithmsService
        .consumeRow({ board })
        .then((result) => {

          expect(result.change).toBeTruthy();
          expect(_.isEqual(board, result.board)).toBeFalsy();
          expect(_.isEqual(expectedBoard, result.board)).toBeTruthy();
          expect(_.isEqual(expectedProduction, result.production)).toBeTruthy();

          done();
        });
    });
  });

  describe(`#digest`, () => {
    it(`shouldn't consume and gravity`, (done) => {
      const board = [
        [`f`, `g`, `h`, `f`, `h`, `w`, `w`, `f`],
        [`p`, `t`, `w`, `f`, `f`, `t`, `f`, `t`],
        [`t`, `t`, `h`, `s`, `t`, `p`, `w`, `t`],
        [`f`, `g`, `h`, `h`, `f`, `h`, `f`, `s`],
        [`s`, `p`, `h`, `g`, `f`, `t`, `w`, `t`],
        [`g`, `p`, `s`, `p`, `t`, `s`, `h`, `g`],
        [`t`, `f`, `f`, `h`, `g`, `g`, `g`, `g`],
        [`p`, `f`, `s`, `t`, `w`, `h`, `p`, `t`]
      ];

      const expectedBoard = [
        [`f`, `g`, ``, `f`, ``, ``, ``, ``],
        [`p`, `t`, ``, `f`, `h`, `w`, `w`, `f`],
        [`t`, `t`, ``, `s`, `f`, `t`, `f`, `t`],
        [`f`, `g`, `h`, `h`, `t`, `p`, `w`, `t`],
        [`s`, `p`, `w`, `g`, `f`, `h`, `f`, `s`],
        [`g`, `p`, `s`, `p`, `f`, `t`, `w`, `t`],
        [`t`, `f`, `f`, `h`, `t`, `s`, `h`, `g`],
        [`p`, `f`, `s`, `t`, `w`, `h`, `p`, `t`]
      ];

      KingdomAlgorithmsService
        .digest({ board })
        .then((result) => {

          expect(result.change).toBeFalsy();
          expect(_.isEqual(board, result.board)).toBeFalsy();
          expect(_.isEqual(expectedBoard, result.board)).toBeTruthy();
          expect(_.isEqual({ h: 3, g: 4 }, result.production)).toBeTruthy();

          done();
        });
    });
  });
});
