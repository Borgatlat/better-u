import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

export function PremiumNavigation() {
  const navigationItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Community", href: "/community" },
    { name: "Settings", href: "/settings" },
    { name: "Support", href: "/support" },
  ]

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.name}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default PremiumNavigation
