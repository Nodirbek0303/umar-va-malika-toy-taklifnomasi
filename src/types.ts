/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RSVP {
  id: string;
  name: string;
  isComing: boolean;
  guestCount: number;
  wish: string;
  createdAt: string;
}

export interface ProgramItem {
  id: string;
  time: string;
  title: string;
  description: string;
  iconName: string;
}
