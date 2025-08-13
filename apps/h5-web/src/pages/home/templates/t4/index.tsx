// src/pages/home/templates/t4/index.tsx
import { useEffect, useState } from "react";
import { mockData } from "./mock";
import styles from "./styles/index.module.scss";
import specialBanner from "./images/special-banner.jpg";

export default function Template4() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟加载数据（实际环境用 API）
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>Loading T4...</div>
      </div>
    );
  }

  return (
    <div className={styles.specialContainer}>
      {/* 独特的头部 */}
      <header className={styles.header}>
        <h1>Template 4 - 极简风格</h1>
        <p>完全自定义的模板实现</p>
      </header>

      {/* 特殊轮播图 */}
      <section className={styles.heroBanner}>
        <img src={specialBanner} alt="Special Banner" />
        <div className={styles.heroContent}>
          <h2>{data.hero.title}</h2>
          <p>{data.hero.subtitle}</p>
        </div>
      </section>

      {/* 特殊内容布局 */}
      <section className={styles.contentGrid}>
        {data.items.map((item: any) => (
          <article key={item.id} className={styles.contentCard}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className={styles.tag}>{item.category}</span>
          </article>
        ))}
      </section>
    </div>
  );
}
