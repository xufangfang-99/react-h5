// src/pages/home/templates/t3/index.tsx
import { useAtom } from "@/store";
import { useHomeData } from "../common/hooks/useHomeData";
import { viewModeAtom, filterAtom } from "./store/index.atom";
import commonStyles from "../common/styles/index.module.scss";
import styles from "./styles/index.module.scss";

export default function Template3() {
  const { banners, products, loading } = useHomeData();
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [filter, setFilter] = useAtom(filterAtom);

  // 根据价格范围筛选产品
  const filteredProducts = products.filter(
    (product) =>
      product.price >= filter.priceRange[0] &&
      product.price <= filter.priceRange[1],
  );

  if (loading) {
    return (
      <div className={commonStyles.container}>
        <div className="flex-center h-[400px]">
          <div className="text-lg">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={commonStyles.container}>
      <h1 className={styles.title}>模板3 - 筛选风格</h1>

      {/* 轮播图 */}
      <section className={styles.bannerSection}>
        {banners.map((banner) => (
          <div key={banner.id} className={commonStyles.banner}>
            <img src={banner.image} alt={banner.title} />
          </div>
        ))}
      </section>

      {/* 筛选控制栏 */}
      <section className={styles.filterBar}>
        {/* 视图切换 */}
        <div className={styles.viewToggle}>
          <button
            className={viewMode === "grid" ? styles.active : ""}
            onClick={() => setViewMode("grid")}
          >
            网格
          </button>
          <button
            className={viewMode === "list" ? styles.active : ""}
            onClick={() => setViewMode("list")}
          >
            列表
          </button>
        </div>

        {/* 价格筛选 */}
        <div className={styles.priceFilter}>
          <span>价格范围：</span>
          <input
            type="range"
            min="0"
            max="1000"
            value={filter.priceRange[1]}
            onChange={(e) =>
              setFilter({
                ...filter,
                priceRange: [0, Number(e.target.value)],
              })
            }
          />
          <span>¥0 - ¥{filter.priceRange[1]}</span>
        </div>
      </section>

      {/* 产品列表 */}
      <section className={styles.productSection}>
        <h2>产品列表 ({filteredProducts.length})</h2>
        <div
          className={
            viewMode === "grid" ? commonStyles.productGrid : styles.productList
          }
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={
                viewMode === "grid"
                  ? commonStyles.productCard
                  : styles.productListItem
              }
            >
              <img src={product.image} alt={product.name} />
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.price}>¥{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
