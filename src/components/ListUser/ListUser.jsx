import styles from "./ListUser.module.css";
import editUser from "../../assets/icons/edit_black_24dp.svg";
import { Link } from "react-router-dom";
import EditUser from "../../pages/EditUser/EditUser.jsx";
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
        <button
          className={styles.user}
          onClick={() => window.location.href = `/edituser/${user.id}`}
        >
          {user.user}
        </button>
      </td>
      <td className={styles.name}>
        <button
          className={styles.link}
          onClick={() => window.location.href = `/edituser/${user.id}`}
        >
          {user.name}
        </button>
      </td>
      <td className={styles.empresa}>
        <button
          className={styles.link}
          onClick={() => window.location.href = `/edituser/${user.id}`}
        >
          {user.company}
        </button>
      </td>
      <td className={styles.cnpj}>
        <button
          className={styles.link}
          onClick={() => window.location.href = `/edituser/${user.id}`}
        >
          {user.cnpj}
        </button>
      </td>
      <button className={styles.pencilEdit} onClick={() => window.location.href = `/edituser/${user.id}`} >
        <img src={editUser} alt="editUser" />
      </button>
    </tr>
  );
}
