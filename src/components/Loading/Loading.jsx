import styles from  "./Loading.module.css";

const Loading = () => {
    return (
        <>
            <div className={styles.modal_loading}>
                <div className={styles.spinner}>

                </div>
            </div>
            <div className={styles.overlay}></div>
        </>
    )
}

export default Loading;