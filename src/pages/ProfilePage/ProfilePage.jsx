import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../component/Input";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setUser(response.data.user);
        setForm(response.data.user);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/auth/update", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setUser(response.data.user);
      setEdit(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className='bg-[#F8FCFF] mt-20 h-full pb-8 '>
        <div className='p-4 flex items-center'>
          <div className='flex justify-center bg-[#A3B4BB] m-4 p-6 rounded-xl w-40 '>
            <h1 className='text-[#26363A] font-semibold text-4xl'>Profile</h1>
          </div>
        </div>
        <div className='w-3/5 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md text-balance'>
          {edit ? (
            <form onSubmit={handleSubmit}>
              <div>
                <label>First name: </label>
                <Input
                  type='text'
                  name='firstName'
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Last name: </label>
                <Input
                  type='text'
                  name='lastName'
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Username: </label>
                <Input
                  type='text'
                  name='username'
                  value={form.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Email: </label>
                <Input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className='flex justify-center gap-8 mt-8'>
                <button
                  className='border-2 px-4 py-2 rounded-full border-[#415F6C]'
                  type='submit'
                >
                  Save
                </button>
                <button
                  className='border-2 px-4 py-2 rounded-full border-[#F86158]'
                  type='button'
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div>
                <span>First name: {user.firstName}</span>
              </div>
              <div>
                <span>Last name: {user.lastName}</span>
              </div>
              <div>
                <span>Username: {user.username}</span>
              </div>
              <div>
                <span>Email: {user.email}</span>
              </div>
              <div className=' flex justify-center mt-8'>
                <button
                  className='border-2 p-2 rounded-full border-[#C1D547]'
                  onClick={() => setEdit(true)}
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
