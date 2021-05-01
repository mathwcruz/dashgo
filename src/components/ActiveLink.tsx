import { cloneElement, ReactElement } from "react";
import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement; // = componente react
  shouldMatchExactHref?: boolean; // link bater exatamente com o começo da rota
};

export function ActiveLink({ children, shouldMatchExactHref = false, ...rest }: ActiveLinkProps) {
  let isActive = false;
  const { asPath } = useRouter();

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) { // caso a rota que o usuário esteja, seja a mesma que o link atual redireciona, muda a variável
    isActive = true;
  };

  if (!shouldMatchExactHref && 
    (asPath.startsWith(String(rest.href)) ||
    asPath.startsWith(String(rest.as)))) {
    isActive = true;
  };

  return (
    <Link {...rest}>
      { cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50" // alterando a cor do item na navegação, caso esteja ativo
      }) }
    </Link>
  );
};