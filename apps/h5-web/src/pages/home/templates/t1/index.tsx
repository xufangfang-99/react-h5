// src/pages/home/templates/t1/index.tsx
import { useHomeData } from "../common/hooks/useHomeData";
import commonStyles from "../common/styles/index.module.scss";
import styles from "./styles/index.module.scss";

export default function Template1() {
  const { banners, products, loading } = useHomeData();

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
      <h1 className={styles.title}>模板1 - 默认风格</h1>

      {/* 轮播图区域 */}
      <section className={styles.bannerSection}>
        <div className={commonStyles.banner}>
          {banners.length > 0 ? (
            banners.map((banner) => (
              <div key={banner.id} className={styles.bannerItem}>
                <img src={banner.image} alt={banner.title} />
                <div className={styles.bannerContent}>
                  <h3>{banner.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyBanner}>暂无轮播图</div>
          )}
        </div>
      </section>

      {/* 产品列表区域 */}
      <section className={styles.productSection}>
        <h2 className={styles.sectionTitle}>热门产品</h2>
        <div className={commonStyles.productGrid}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className={commonStyles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.name} />
                </div>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>¥{product.price}</p>
                <button className={styles.buyButton}>立即购买</button>
              </div>
            ))
          ) : (
            <div className={styles.emptyProducts}>暂无产品</div>
          )}
        </div>
      </section>
    </div>
  );
}
