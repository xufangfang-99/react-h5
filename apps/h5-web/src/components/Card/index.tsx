import styles from "./Card.module.scss";

interface CardProps {
  children: React.ReactNode;
  clickable?: boolean;
  className?: string;
}

export function Card({ children, clickable, className = "" }: CardProps) {
  return (
    <div
      className={`${styles.card} ${clickable ? styles.clickable : ""} ${className}`}
    >
      {children}
    </div>
  );
}
