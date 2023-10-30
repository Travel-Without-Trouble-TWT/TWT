function Error() {
  return (
    <div className="min-w-full min-h-screen flex justify-center items-center py-3 dark:bg-slate-950">
      <div className="w-2/3 flex flex-col py-1 justify-center items-center sm:w-full xs:w-full">
        <p className="text-red-500 font-bold text-xl">
          ⚠️ 데이터를 불러오는 중 오류가 발생했습니다.
        </p>
        <p className="text-gray-500">나중에 다시 시도해주세요.</p>
      </div>
    </div>
  );
}

export default Error;
