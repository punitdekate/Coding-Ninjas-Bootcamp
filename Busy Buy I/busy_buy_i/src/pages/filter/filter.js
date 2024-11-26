import { useState } from "react";
import styles from "./filter.module.css";
import { useProductContext } from "../../contexts/productContext";
function Filter() {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(20000);
  const { price, setPrice, categories, selectedCategory, setSelectedCategory } =
    useProductContext();
  return (
    <>
      <div className={styles.filter}>
        <div className={styles.filterContainer}>Filters</div>
        <div className={styles.section}>
          <div className={styles.section1}>
            <div>
              <h4 className={styles.section1_title}>Select Price Range</h4>
            </div>
            <div className={styles.dropdownContainer}>
              <input
                type='range'
                min={min}
                max={max}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.section2}>
            <div>
              <h4 style={styles.section2_title}>Category</h4>
            </div>
            <div className={styles.checkboxContainer}>
              {categories?.length > 0
                ? categories.map((ele) => (
                    <div className={styles.checkBox}>
                      <input
                        type='checkbox'
                        id='subscribe'
                        className={styles.styledCheckbox}
                        value={ele}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // Add category to selectedCategories
                            setSelectedCategory((prev) => [
                              ...prev,
                              e.target.value.toLowerCase(),
                            ]);
                          } else {
                            // Remove category from selectedCategories
                            setSelectedCategory((prev) =>
                              prev.filter(
                                (category) =>
                                  category !==
                                  e.target.value.toLocaleLowerCase()
                              )
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor='subscribe'
                        className={styles.checkboxLabel}
                      >
                        {ele}
                      </label>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
