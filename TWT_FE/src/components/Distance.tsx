const Distance = ({ distance }: number) => {
  const walkkTime = (distance / 67) | 0;
  const bycicleTime = (distance / 227) | 0;

  return (
    <div className="bg-white">
      <ul>
        <li>
          <span className="label font-semibold">도보</span>
          {walkkTime > 60 && (
            <span className="number">약 {Math.floor(walkkTime / 60)} 시간</span>
          )}
          <span className="number">{walkkTime % 60}</span> 분
        </li>
        <li>
          <span className="label font-semibold">자전거</span>
          {bycicleTime > 60 && (
            <span className="number">
              약 {Math.floor(bycicleTime / 60)} 시간
            </span>
          )}
          <span className="number">{bycicleTime % 60}</span> 분
        </li>
      </ul>
    </div>
  );
};

export default Distance;
