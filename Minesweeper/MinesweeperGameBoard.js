
function TGameBoard(aImage, aSPSheet) {
  const sps = [];

  // Top left
  let pos = Object.create(Position);
  let newSp = new TSprite(aImage, aSPSheet.TopLeft, pos);
  sps.push(newSp);

  // Top Right
  pos = Object.create(Position);
  pos.x = cvs.width - aSPSheet.TopRight.w;
  newSp = new TSprite(aImage, aSPSheet.TopRight, pos);
  sps.push(newSp);

  // Top Middle
  pos = Object.create(Position);
  pos.x = aSPSheet.TopLeft.x + aSPSheet.TopLeft.w;
  newSp = new TSprite(aImage, aSPSheet.TopMiddle, pos);
  newSp.setScale(
    {
      x: (cvs.width - (aSPSheet.TopLeft.w + aSPSheet.TopRight.w)) / aSPSheet.TopMiddle.w,
      y: 1
    }
  );
  sps.push(newSp);

  // Bottom Left
  pos = Object.create(Position);
  pos.y = cvs.height - aSPSheet.BottomLeft.h;
  newSp = new TSprite(aImage, aSPSheet.BottomLeft, pos);
  sps.push(newSp);

  // Bottom Right
  pos = Object.create(Position);
  pos.x = cvs.width - aSPSheet.BottomRight.w;
  pos.y = cvs.height - aSPSheet.BottomRight.h;
  newSp = new TSprite(aImage, aSPSheet.BottomRight, pos);
  sps.push(newSp);

  // Bottom Middle
  pos = Object.create(Position);
  pos.x = aSPSheet.BottomLeft.w;
  pos.y = cvs.height - aSPSheet.BottomMiddle.h;
  newSp = new TSprite(aImage, aSPSheet.BottomMiddle, pos);
  newSp.setScale(
    {
      x: (cvs.width - (aSPSheet.BottomLeft.w + aSPSheet.BottomRight.w)) / aSPSheet.BottomMiddle.w,
      y: 1
    }
  );
  sps.push(newSp);

  // Left Middle
  pos = Object.create(Position);
  pos.y = aSPSheet.TopLeft.h;
  newSp = new TSprite(aImage, aSPSheet.LeftMiddle, pos);
  newSp.setScale(
    {
      x: 1,
      y: (cvs.height - (aSPSheet.TopLeft.h + aSPSheet.BottomLeft.h)) / aSPSheet.LeftMiddle.h,
    }
  );
  sps.push(newSp);

  // Right Middle
  pos = Object.create(Position);
  pos.x = cvs.width - aSPSheet.RightMiddle.w;
  pos.y = aSPSheet.TopRight.h;
  newSp = new TSprite(aImage, aSPSheet.RightMiddle, pos);
  newSp.setScale(
    {
      x: 1,
      y: (cvs.height - (aSPSheet.TopRight.h + aSPSheet.BottomRight.h)) / aSPSheet.RightMiddle.h,
    }
  );
  sps.push(newSp);


  this.draw = function () {
    for (let i = 0; i < sps.length; i++) {
      sps[i].draw();
    }
  };
}
