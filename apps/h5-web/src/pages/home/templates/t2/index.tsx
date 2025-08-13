// src/pages/home/templates/t2/index.tsx
import { useEffect, useState } from "react";
import { homeAPI } from "./api";
import commonStyles from "../common/styles/index.module.scss";
import styles from "./styles/index.module.scss";

export default function Template2() {
  const [banners, setBanners] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bannersData, productsData] = await Promise.all([
          homeAPI.getBanners(),
          homeAPI.getProducts(),
        ]);
        setBanners(bannersData);
        setProducts(productsData);
      } catch (error) {
        console.error("加载失败:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
    <div className={`${commonStyles.container} ${styles.template2}`}>
      <h1 className={styles.title}>模板2 - 促销风格</h1>

      {/* 轮播图 - 使用通用样式 */}
      <section className={styles.bannerSection}>
        {banners.map((banner) => (
          <div key={banner.id} className={commonStyles.banner}>
            <img src={banner.image} alt={banner.title} />
          </div>
        ))}
      </section>

      {/* 产品列表 - 带促销标签 */}
      <section className={styles.productSection}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.hotIcon}>🔥</span>
          限时特惠
        </h2>
        <div className={commonStyles.productGrid}>
          {products.map((product: any) => (
            <div
              key={product.id}
              className={`${commonStyles.productCard} ${styles.productCard}`}
            >
              {/* 促销标签 */}
              {product.tag && <span className={styles.tag}>{product.tag}</span>}

              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>

              {/* 价格显示 */}
              <div className={styles.priceBox}>
                {product.discount < 1 ? (
                  <>
                    <span className={styles.originalPrice}>
                      ¥{product.price}
                    </span>
                    <span className={styles.discountPrice}>
                      ¥{(product.price * product.discount).toFixed(0)}
                    </span>
                  </>
                ) : (
                  <span className={styles.price}>¥{product.price}</span>
                )}
              </div>

              <button className={styles.buyButton}>
                {product.discount < 1 ? "立即抢购" : "立即购买"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
