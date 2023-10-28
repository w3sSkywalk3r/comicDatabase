import styles from '../styles/navbar.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Navbar = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleAddClick = () => {
        router.push('/addComic');
    };

    const handleSearchClick = () => {
        // handle search click
    };

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.logo}>Comic Collection</h1>
            <div className={styles.searchContainer}>
                <input type="text" id="search" name="search" placeholder="Search" value={searchText} onChange={handleSearchChange} className={`${styles.input} ${styles.blackText}`} />
                <button type="button" onClick={handleSearchClick} className={`${styles.searchButton} ${styles.button}`}>Search</button>
            </div>
            <button type="button" onClick={handleAddClick} className={styles.addButton}>+ Add Comic</button>
        </nav>
    );
};

export default Navbar;