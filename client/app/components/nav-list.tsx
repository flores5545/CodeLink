import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from './button';
import styles from '@/app/styles/nav-list.module.css';

interface Properties {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export default function NavList({loggedIn, setLoggedIn} : Properties) {
  const router = useRouter();

  function handleClick(useCase: string) {
    if (useCase === 'Log out') {
      setLoggedIn(false);
      router.push('http://localhost:3001/logout');
    }
    if (useCase === 'Log in') {
      //setLoggedIn(true);
      router.push('http://localhost:3001/login');
    }
    if (useCase === 'Register') {
      // router.push('/register');
      router.push('/create-profile');
    }
  }
  return (
    <ul className={styles.nav_list}>
      {/* Should we mention each link separately or have an external object with the links and maps them? */}
      {/* On click redirect to appropriate page */}
      {/* Consider changing to map through buttons? */}
      {/* Home could be the brand logo. */}
      {/* Consider mapping */}
      {loggedIn && (
        <li>
          <Link href="/" className={styles.nav_item}>
            Home
          </Link>
        </li>
      )}
      {loggedIn && (
        <li>
          <Link href="/profile" className={styles.nav_item}>
            Profile
          </Link>
        </li>
      )}
      {/* If logged out */}
      {/* May be a better way to do this by passing useCase to handleClick or some other way. */}
      {!loggedIn && (
        <li>
          <Button
            useCase={'Register'}
            onClick={() => handleClick('Register')}
          />
        </li>
      )}
      {/* If logged out */}
      {!loggedIn && (
        <li>
          <Button useCase={'Log in'} onClick={() => handleClick('Log in')} />
        </li>
      )}
      {/* Consider mapping */}
      <li>
        <Link href="news" className={styles.nav_item}>
          News
        </Link>
      </li>
      <li>
        <Link href="/project" className={styles.nav_item}>
          Discussion-Board
        </Link>
      </li>
      <li>
        <Link href="/jobs" className={styles.nav_item}>
          Job board
        </Link>
      </li>
      {/* If logged in */}
      {loggedIn && (
        <li>
          <Button useCase={'Log out'} onClick={() => handleClick('Log out')} />
        </li>
      )}
    </ul>
  );
}