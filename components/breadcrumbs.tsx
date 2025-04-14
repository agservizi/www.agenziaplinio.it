"use client"

export default function Breadcrumbs() {
  // Return null to eliminate the breadcrumb from all pages
  return null

  // Original code is commented out below in case it needs to be restored
  /*
  const pathname = usePathname()

  if (pathname === "/") return null

  const pathSegments = pathname.split("/").filter((segment) => segment)

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    const isLast = index === pathSegments.length - 1

    return {
      href,
      label,
      isLast,
    }
  })

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-3 text-sm">
      <ol className="flex flex-wrap items-center" itemScope itemType="https://schema.org/BreadcrumbList">
        <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link
            href="/"
            className="text-gray-500 hover:text-primary transition-colors flex items-center"
            itemProp="item"
          >
            <Home size={16} className="mr-1" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
          <ChevronRight size={14} className="mx-2 text-gray-400" />
        </li>

        {breadcrumbItems.map((item, index) => (
          <li
            key={item.href}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {item.isLast ? (
              <span className="font-medium text-primary" itemProp="name">
                {item.label}
              </span>
            ) : (
              <>
                <Link href={item.href} className="text-gray-500 hover:text-primary transition-colors" itemProp="item">
                  <span itemProp="name">{item.label}</span>
                </Link>
                <ChevronRight size={14} className="mx-2 text-gray-400" />
              </>
            )}
            <meta itemProp="position" content={`${index + 2}`} />
          </li>
        ))}
      </ol>
    </nav>
  )
  */
}
