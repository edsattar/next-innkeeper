## Nextjs

#### 1. create new nextjs app

```sh
npx create-next-app@latest cms --ts --tailwind --eslint
```

old stuff for reference
````tsx
<Select onValueChange={onSearchViaSelect}>
  <SelectTrigger className="w-[120px]">
    <SelectValue placeholder="Search via" />
  </SelectTrigger>
  <SelectContent className="pt-2">
    <SelectGroup className="grid">
      <SelectItem value="phone">Phone</SelectItem>
      <SelectItem value="email">Email</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select> 

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>New Reservation</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" align="end">
    <DropdownMenuItem>
      <Link href="/staff/reservations/new">
        <span>New Customer</span>
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <span>Existing Customer</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
````
