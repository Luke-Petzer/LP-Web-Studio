import { NavClient } from "@/components/molecules/NavClient";

/**
 * Navigation — Server Component (Organism)
 * Protocol §4: Organisms are Server Components that pass interactive
 * children to Client Components to maintain the server boundary.
 *
 * All scroll state, pathname detection, and spring animations live
 * in <NavClient /> (the Client Molecule island).
 */
export function Navigation() {
    return <NavClient />;
}
