import * as icons from 'lucide-react';
const needed = ['Landmark', 'Store', 'Tractor', 'Ship', 'Warehouse', 'Wheat', 'Coffee', 'Package', 'Building2', 'Truck', 'Globe', 'Briefcase', 'Sprout'];
for (const icon of needed) {
  if (icons[icon]) {
    console.log(icon, 'exists');
  } else {
    console.log(icon, 'missing');
  }
}
