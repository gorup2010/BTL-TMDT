import axios from "axios";
import { useState, useEffect } from "react";
import { LOCAL_ITEM } from "../../utils/const";

const baseURL = "http://localhost:3000/users";

const Password = (props) => {
  // eslint-disable-next-line react/prop-types
  const action = props.action;

  // eslint-disable-next-line react/prop-types

  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    setIsError(false);
    setIsPasswordChange(false);
    e.preventDefault();
    const passwordData = {
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (passwordData.oldPassword != password) {
      setError("Mật khẩu cũ không đúng");
      setIsError(true);
    } else if (passwordData.newPassword != passwordData.confirmPassword) {
      setError("Mật khẩu nhập lại không đúng");
      setIsError(true);
    } else {
      changePassword({ password: passwordData.newPassword });
    }
  };

  const changePassword = async (passwordData) => {
    console.log(passwordData);
    await axios
      .patch(`${baseURL}/${localStorage.getItem(LOCAL_ITEM.ID)}`, passwordData)
      .then(() => setIsPasswordChange(true));
  };

  const getPassword = async () => {
    await axios
      .get(`${baseURL}/${localStorage.getItem(LOCAL_ITEM.ID)}`)
      .then((res) => setPassword(res.data.password));
  };

  useEffect(() => {
    getPassword();
  }, []);

  return (
    <div className="flex flex-col row-start-1 row-span-7 col-start-3 col-span-6 ml-5">
      <div className="py-4 mt-6 border-b border-gray rounded-md h-fit text-3xl font-bold">
        Chỉnh sửa thông tin cá nhân
      </div>
      <form id="form2" className="my-10 mr-10" onSubmit={handleChangePassword}>
        <div className="items-start flex justify-between mt-8">
          <label
            className="inline-block [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg tracking-[0] leading-[normal]"
            htmlFor="oldPassword"
          >
            Mật khẩu cũ
          </label>
          <input
            className="px-3 inline-block float-right w-2/3 h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]"
            type="password"
            id="oldPassword"
            defaultValue=""
            name="oldPassword"
          />
        </div>
        <div className="items-start flex justify-between mt-8">
          <label
            className="inline-block [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg tracking-[0] leading-[normal]"
            htmlFor="newPassword"
          >
            Mật khẩu mới
          </label>
          <input
            className="px-3 inline-block float-right w-2/3 h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]"
            type="password"
            id="newPassword"
            defaultValue=""
            name="newPassword"
          />
        </div>
        <div className="items-start flex justify-between mt-8">
          <label
            className="inline-block [font-family:'Poppins-Medium',Helvetica] font-medium text-black text-lg tracking-[0] leading-[normal]"
            htmlFor="confirmPassword"
          >
            Xác nhận mật khẩu mới
          </label>
          <input
            className="px-3 inline-block float-right w-2/3 h-10 outline-none rounded-[4px] border border-solid border-[#cccccc]"
            type="password"
            id="confirmPassword"
            defaultValue=""
            name="confirmPassword"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => action()}
            className="justify-center items-center w-full rounded-md px-3 py-3 mt-8 mb-16 mr-8 bg-[#4992FF]"
          >
            <p className="text-sm text-white font-semibold">Quay lại</p>
          </button>
          <button
            type="submit"
            className="justify-center items-center w-full rounded-md px-3 py-3 mt-8 mb-16 ml-8 bg-[#16AD4D]"
          >
            <p className="text-sm text-white font-semibold">Cập nhật</p>
          </button>
        </div>
        <div
          id="alert-4"
          className={
            isPasswordChange
              ? " border-4 border-green-300 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              : "hidden"
          }
          role="alert"
        >
          <div className="ms-3 text-sm font-medium">
            Mật khẩu đã được thay đổi thành công
          </div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-4"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div
          id="alert-4"
          className={
            isError
              ? " border-4 border-red-300 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400"
              : "hidden"
          }
          role="alert"
        >
          <div className="ms-3 text-sm font-medium">{error}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-4"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
export default Password;
