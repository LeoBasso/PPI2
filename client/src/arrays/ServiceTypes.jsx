export const serviceTypes = services?.map((service) => ({
  value: service.id,
  label: service.type,  
})) || [];
