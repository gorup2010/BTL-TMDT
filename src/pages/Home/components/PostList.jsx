import RentalPost from "./RentalPost";

const PostList = ({ postsInfo }) => {
  return (
    <div className="flex flex-col gap-4 px-3 py-3 border border-gray-300 rounded-md ">
      <div className="flex items-center">
        <p className="text-base font-semibold mr-5">Sắp xếp</p>
        <button className="bg-gray-300 rounded-md px-2 py-1 font-semibold mr-2">
          Mặc định
        </button>
        <button className="bg-gray-300 rounded-md px-2 py-1 font-semibold">
          Mới nhất
        </button>
      </div>
      {postsInfo.length > 0 ? (
        postsInfo.map((post, i) => {
          const props = {
            id: i,
            ...post,
          };

          return <RentalPost key={i} {...props} />;
        })
      ) : (
        <p className="text-sm font-semibold text-[#0891B2]">
          Trang này hiện chưa có bài đăng nào
        </p>
      )}
    </div>
  );
};

export default PostList;
