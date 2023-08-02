export function getInitials(fullName) {
    const words = fullName.trim().split(/\s+/);
  
    const firstName = words[0];
    const lastName = words.length > 1 ? words[words.length - 1] : "";
  
    const initialFirstName = firstName.charAt(0).toUpperCase();
    const initialLastName = lastName.charAt(0).toUpperCase();
  
    return `${initialFirstName}${initialLastName}`;
  }
