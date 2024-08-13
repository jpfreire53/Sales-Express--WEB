import styles from "./ListUser.module.css";
import editUser from "../../assets/icons/edit_black_24dp.svg";
import { Link } from "react-router-dom";
import EditUser from "../../pages/EditUser/EditUser.js";
import { useEffect, useState } from "react";

export default function ListUser({ user, setSelectUser, selectUser }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleChecked(e, setIsChecked, user) {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectUser([...selectUser, user]);
    } else {
      setSelectUser(
        selectUser.filter((selectedUser) => selectedUser.id !== user.id)
      );
    }

    setIsChecked(isChecked);
  }

  useEffect(() => {}, [selectUser]);

  return (
    <tr key={user.id} className={styles.containerUserInfo}>
      <td>
        <input
          className={styles.checkbox}
          type="checkbox"
          name="userCheckbox"
          id={`userCheckbox_${user.id}`}
          checked={isChecked}
          onChange={(e) => handleChecked(e, setIsChecked, user)}
        />
      </td>
      <td className={styles.user}>
        <Link
          className={styles.user}
          to={`/edituser/${user.id}`}
          element={<EditUser />}
        >
          {user.user}
        </Link>
      </td>
      <td className={styles.name}>
        <Link
          className={styles.link}
          to={`/edituser/${user.id}`}
          element={<EditUser />}
        >
          {user.name}
        </Link>
      </td>
      <td className={styles.empresa}>
        <Link
          className={styles.link}
          to={`/edituser/${user.id}`}
          element={<EditUser />}
        >
          {user.company}
        </Link>
      </td>
      <td className={styles.cnpj}>
        <Link
          className={styles.link}
          to={`/edituser/${user.id}`}
          element={<EditUser />}
        >
          {user.cnpj}
        </Link>
      </td>
      <Link to={`/edituser/${user.id}`} element={<EditUser />}>
        <img src={editUser} alt="editUser" />
      </Link>
    </tr>
  );
}
