import {NavbarItemProps} from "@/components/navbar/types/navbarItem";


export const defaultStuNavbarProps: NavbarItemProps[] = [{
  navURL:'/pages/student/application/application',
  imgURL: 'review-selected',
}, {
  navURL:'/pages/student/personalInfo/personalInfo',
  imgURL: 'mine-unselected',
}]
export const defaultTeaNavbarProps: NavbarItemProps[] = [{
  navURL:'/pages/teacher/review/review',
  imgURL: 'review-selected',
}, {
  navURL:'/pages/teacher/personalInfo/personalInfo',
  imgURL: 'mine-unselected',
}]
