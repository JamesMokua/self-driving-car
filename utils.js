function lerp(A, B, t) {
    return A + (B - A) * t;
  }

  function getIntersection(A, B, C, D) {
    const x1 = A.x;
    const y1 = A.y;
    const x2 = B.x;
    const y2 = B.y;
    const x3 = C.x;
    const y3 = C.y;
    const x4 = D.x;
    const y4 = D.y;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator == 0) {
      return [];
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

    if (t > 0 && t < 1 && u > 0) {
      return [{
        x: lerp(x1, x2, t),
        y: lerp(y1, y2, t),
        offset: t,
      }];
    } else {
      return [];
    }
  }