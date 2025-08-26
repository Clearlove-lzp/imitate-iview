import event_status_total from "../common/event_status.js";
const EVENT_STATUS = event_status_total.EVENT_STATUS,
  GROUP_TYPE = event_status_total.GROUP_TYPE;
import { openLog, logInfo, warn, error } from "./log.js";
var Cache = function (e) {
  (this.ctx = e),
    (this.current_user = null),
    (this.default_gid = 0),
    (this.last_gid = 0),
    (this.current_gid = 0),
    (this.current_group = null),
    (this.out_list_group = null),
    (this.group_map = new Map()),
    (this.member_map = new Map()),
    (this.user_map = new Map()),
    (this.watch_group_map = new Map()),
    (this.enterprise_group_map = new Map()),
    (this.enterprise_user_map = new Map()),
    (this.gruntime_map = new Map()),
    (this.current_user = null),
    (this.log = function (e, t, r) {
      switch (e) {
        case 1:
        default:
          logInfo("Connection", t, r);
          break;
        case 2:
          warn("Connection", t, r);
          break;
        case 3:
          error("Connection", t, r);
      }
    }),
    (this.log = this.log.bind(this));
};
(Cache.prototype.reset = function () {
  (this.current_user = null),
    (this.default_gid = 0),
    (this.last_gid = 0),
    (this.current_gid = 0),
    (this.current_group = null),
    (this.out_list_group = null),
    this.group_map.clear(),
    this.member_map.clear(),
    this.user_map.clear(),
    this.watch_group_map.clear(),
    this.enterprise_group_map.clear(),
    this.enterprise_user_map.clear(),
    this.gruntime_map.clear();
}),
  (Cache.prototype.notify_process = function (e, t) {
    switch (e.code) {
      case EVENT_STATUS.RR_LOGIN_ACK.code:
        this.on_login_ack(t);
        break;
      case EVENT_STATUS.EN_PLAY_AUDIO_FILE_STATUS.code:
        this.fileStatus_ack(t);
        break;
      case EVENT_STATUS.RR_LOGOUT_ACK.code:
        (this.current_user = null),
          sessionStorage.removeItem("slsdk_userinfo"),
          sessionStorage.removeItem("logininfo");
        break;
      case EVENT_STATUS.DISCONNECT.code:
        this.reset();
        break;
      case EVENT_STATUS.RR_QUERY_GROUP_ACK.code:
        this.on_query_group_ack(t);
        break;
      case EVENT_STATUS.RR_QUERY_ENTERPRISE_GROUP_ACK.code:
        this.on_query_enterprise_group_ack(t);
        break;
      case EVENT_STATUS.RR_JOIN_GROUP_ACK.code:
        this.on_join_group_ack(t);
        break;
      case EVENT_STATUS.RR_QUERY_MEMBERS_ACK.code:
        this.on_query_members_ack(t);
        break;
      case EVENT_STATUS.PUSH_USERS_CHANGED.code:
        this.on_user_changed(t);
        break;
      case EVENT_STATUS.PUSH_MEMBERS_CHANGED.code:
        this.on_member_changed(t);
        break;
      case EVENT_STATUS.PUSH_GROUP_LIST_CHANGED.code:
        this.on_group_list_changed(t);
        break;
      case EVENT_STATUS.PUSH_CURRENT_GROUP.code:
        this.on_current_group(t);
        break;
      case EVENT_STATUS.RR_LISTEN_GROUP_ACK.code:
        this.on_listen_group_ack(t);
        break;
      case EVENT_STATUS.RR_UNLISTEN_GROUP_ACK.code:
        this.on_unlisten_group_ack(t);
        break;
      case EVENT_STATUS.RR_CREATE_GROUP_ACK.code:
        this.on_create_group_ack(t);
        break;
      case EVENT_STATUS.RR_GET_WATCH_GROUP_ACK.code:
        this.on_query_listen_group_ack(t);
        break;
      case EVENT_STATUS.PUSH_ON_USER_STATUS_CHANGED.code:
        this.on_user_status_changed(t);
        break;
      case EVENT_STATUS.PUSH_ON_GROUP_CHANGED.code:
        this.on_group_changed(t);
    }
  }),
  (Cache.prototype.get_current_uid = function () {
    return this.current_user ? this.current_user.uid : 0;
  }),
  (Cache.prototype.get_myself = function () {
    return console.log("获取当前用户信息"), this.current_user;
  }),
  (Cache.prototype.get_user_by_uid = function (e) {
    return this.user_map.has(e) ? this.user_map.get(e) : null;
  }),
  (Cache.prototype.get_default_gid = function () {
    return this.default_gid ? this.default_gid : 0;
  }),
  (Cache.prototype.get_last_gid = function () {
    return this.last_gid;
  }),
  (Cache.prototype.get_group_list = function () {
    let e = [...this.group_map.values()];
    console.log(e, "---this.group_map");
    let t = [];
    for (let r = 0; r < e.length; r++)
      (4 != e[r].type && "STATIC" != e[r].type) || t.push(e[r]);
    console.log(t, "---arrr");
    let r = [],
      s = [],
      i = [];
    for (let e = 0; e < t.length; e++)
      3 == t[e].priority && r.push(t[e]),
        2 == t[e].priority && s.push(t[e]),
        1 == t[e].priority && i.push(t[e]);
    r.sort((e, t) => t.createTime - e.createTime),
      s.sort((e, t) => t.createTime - e.createTime),
      i.sort((e, t) => t.createTime - e.createTime);
    let o = [];
    return (
      r.forEach((e) => {
        o.push(e);
      }),
      s.forEach((e) => {
        o.push(e);
      }),
      i.forEach((e) => {
        o.push(e);
      }),
      console.log(o, "---arrr"),
      o
    );
  }),
  (Cache.prototype.get_temporary_group_list = function () {
    let e = [],
      t = [...this.group_map.values()];
    for (let r = 0; r < t.length; r++)
      (5 != t[r].type && "SESSION" != t[r].type) || e.push(t[r]);
    return console.log("临时会话", t), e;
  }),
  (Cache.prototype.get_group_by_gid = function (e) {
    if (this.group_map.has(e)) return this.group_map.get(e);
    if (this.enterprise_group_map.has(e)) {
      return this.enterprise_group_map.get(e).group;
    }
    return this.out_list_group && this.out_list_group.gid === e
      ? this.out_list_group
      : null;
  }),
  (Cache.prototype.get_group_session_by_gid = function (e) {
    if (this.group_map.has(e)) return this.group_map.get(e);
    if (this.enterprise_group_map.has(e)) {
      return this.enterprise_group_map.get(e).group;
    }
    return this.out_list_group && this.out_list_group.gid === e
      ? this.out_list_group
      : null;
  }),
  (Cache.prototype.get_member_list = function (e) {
    return this.member_map.has(e)
      ? this.member_map.get(e)
      : (this.ctx.connection.query_members(e), null);
  }),
  (Cache.prototype.get_member_by_uid = function (e, t) {
    if (this.member_map.has(e)) {
      let r = this.member_map.get(e);
      for (let e = 0; e < r.length; e++) if (t == r[e].user.uid) return r[e];
    }
    return null;
  }),
  (Cache.prototype.get_enterprise_grouplist = function () {
    return Object.values(this.enterprise_group_map);
  }),
  (Cache.prototype.get_cachemember = function (e, t) {
    if (this.member_map.has(e)) {
      let r = this.member_map.get(e);
      for (let e = 0; e < r.length; e++) if (t == r[e].user.uid) return r[e];
    }
    return null;
  }),
  (Cache.prototype.get_audio_enabled = function () {
    return (
      console.log("获取自己是否可对讲", this.current_user),
      !!this.current_user && this.current_user.configure.audioEnabled
    );
  }),
  (Cache.prototype.get_group_by_index = function (e) {
    return e <= this.group_map.size ? this.group_map[e] : null;
  }),
  (Cache.prototype.get_listen_group_by_gid = function (e) {
    return this.watch_group_map.has(e) ? this.watch_group_map.get(e) : null;
  }),
  (Cache.prototype.get_configure = function () {
    return this.current_user ? this.current_user.configure : null;
  }),
  (Cache.prototype.get_user = function (e) {
    return this.user_map.has(e) ? this.user_map.get(e) : null;
  }),
  (Cache.prototype.get_group_by_gid_self = function (e) {
    return this.group_map.has(e) ? this.group_map.get(e) : null;
  }),
  (Cache.prototype.clean_current_group = function (e) {
    this.current_group &&
      this.current_group.gid == e &&
      (this.current_group = null);
  }),
  (Cache.prototype.get_group_count = function () {
    return this.group_map.size;
  }),
  (Cache.prototype.get_default_listengrouplist = function () {
    return [...this.watch_group_map.keys()];
  }),
  (Cache.prototype.get_listen_group_gids = function () {
    return [...this.watch_group_map.keys()];
  }),
  (Cache.prototype.get_listen_group_count = function () {
    return this.watch_group_map.size;
  }),
  (Cache.prototype.get_group_runtime = function (e) {
    return this.gruntime_map.has(e) ? this.gruntime_map.get(e) : null;
  }),
  (Cache.prototype.get_watch_group_list = function () {
    return Object.values(this.watch_group_map);
  }),
  (Cache.prototype.get_current_group = function () {
    return this.current_group;
  }),
  (Cache.prototype.get_watch_group_by_gid = function (e) {
    return this.watch_group_map.has(e) ? this.watch_group_map.get(e) : null;
  }),
  (Cache.prototype.fileStatus_ack = function (e) {
    this.ctx.notify_cb(EVENT_STATUS.EN_PLAY_AUDIO_FILE_STATUS, e);
  }),
  (Cache.prototype.on_login_ack = function (e) {
    let t = e.jmsg;
    "SUCCESS" === t.result &&
      t.self &&
      ((this.current_user = t.self), this.reset_crrent_userinfo());
  }),
  (Cache.prototype.on_query_group_ack = function (e) {
    let t = e.jmsg;
    if (null == t.groups) return;
    this.group_map.clear();
    for (let e = 0; e < t.groups.length; e++)
      this.ctx.connection.query_members(t.groups[e].gid);
    for (let e = 0; e < t.groups.length; e++)
      this.group_map.set(t.groups[e].gid, t.groups[e]);
    this.ctx.notify_cb(EVENT_STATUS.NOTICE_GROUPLIST_CHANGED, null);
  }),
  (Cache.prototype.on_query_enterprise_group_ack = function (e) {
    let t = e.jmsg;
    if (0 == t.result) {
      this.enterprise_group_map.clear(), this.enterprise_user_map.clear();
      for (let e = 0; e < t.egroups.length; e++) {
        let r = t.egroups[e],
          s = r.members;
        this.enterprise_group_map.set(r.group.gid, r);
        for (let e = 0; e < s.length; e++)
          this.enterprise_user_map.set(s[e].user.uid, s[e].user);
      }
      this.ctx.notify_cb(EVENT_STATUS.NOTICE_ENTERPRISE_GROUPLIST_CHANGED, {});
    }
  }),
  (Cache.prototype.on_query_members_ack = function (e) {
    let t = e.jmsg.members;
    if (!t) return;
    if (0 == t.members.length) return;
    let r = t.gid;
    if (null === this.get_group_by_gid(r)) return;
    let s = new Object();
    (s.gid = r),
      (s.changed_info = null),
      this.ctx.notify_cb(EVENT_STATUS.NOTICE_MEMBERLIST_CHANGED, s),
      this.member_map.delete(r),
      t.members.length && this.add_members(r, t.members, t.members.length);
  }),
  (Cache.prototype.on_query_contacts_ack = function (e) {}),
  (Cache.prototype.on_query_users_ack = function (e) {}),
  (Cache.prototype.on_join_group_ack = function (e) {
    var t = e.jmsg;
    if ("SUCCESS" !== t.result) return;
    let r = t.gruntime.group;
    this.add_gruntime(t.gruntime);
    let s = !1,
      i = 0,
      o = 0,
      n = this.get_group_by_gid_self(r.gid);
    null !== n
      ? ((i = n.session.begin_time),
        (o = n.session.end_time),
        this.group_map.delete(r.gid))
      : (s = !0),
      0 === r.session.begin_time && (r.session.begin_time = i),
      0 === r.session.end_time && (r.session.end_time = o),
      this.ctx.connection.query_members(r.gid),
      (n = r),
      (this.current_group = n),
      s
        ? (this.out_list_group && (this.out_list_group = null),
          (this.out_list_group = n))
        : this.group_map.set(n.gid, n);
  }),
  (Cache.prototype.on_change_name_ack = function (e) {
    if ("SUCCESS" !== e.result) return;
    let t = e.jmsg;
    if (null === t.name) return;
    (this.current_user.name = t.name),
      this.reset_crrent_userinfo(),
      this.refresh_memberlist_by_userchanged(this.current_user);
    let r = new Object();
    (r.is_success = !0),
      this.ctx.notify_cb(EVENT_STATUS.NOTICE_NAME_CHANGED, r);
  }),
  (Cache.prototype.on_set_avatar_ack = function (e) {}),
  (Cache.prototype.on_set_sex_ack = function (e) {}),
  (Cache.prototype.on_updata_member_top_ack = function (e) {}),
  (Cache.prototype.on_create_group_ack = function (e) {
    if ("SUCCESS" !== e.result) return;
    let t = e.jmsg;
    null != t.group &&
      (this.group_map.has(t.group.gid) && this.group_map.delete(t.group.gid),
      this.group_map.set(t.group.gid, t.group));
  }),
  (Cache.prototype.on_user_status_changed = function (e) {
    let t = e.jmsg;
    t.onlines || (t.onlines = []),
      t.offlines || (t.offlines = []),
      t.blockeds || (t.blockeds = []);
    let r = t.onlines.length + t.offlines.length + t.blockeds.length,
      s = new Array();
    for (let e = 0; e < t.onlines.length; e++) {
      if (!1 === this.user_map.has(t.onlines[e])) continue;
      let r = this.user_map.get(t.onlines[e]);
      (r.online = 3), s.push(r.uid), this.refresh_memberlist_by_userchanged(r);
    }
    for (let e = 0; e < t.offlines.length; e++) {
      if (!1 === this.user_map.has(t.offlines[e])) continue;
      let r = this.user_map.get(t.offlines[e]);
      console.log(r, "-----refresh_memberlist_by_userchanged"),
        (r.online = 1),
        s.push(r.uid),
        this.refresh_memberlist_by_userchanged(r);
    }
    for (let e = 0; e < t.blockeds.length; e++) {
      if (!1 === this.user_map.has(t.blockeds[e])) continue;
      let r = this.user_map.get(t.blockeds[e]);
      (r.blocked = !0),
        s.push(r.uid),
        this.refresh_memberlist_by_userchanged(r);
    }
    let i = new Object();
    (i.total = r),
      (i.uids = s),
      this.ctx.notify_cb(EVENT_STATUS.NOTICE_USER_STATUS_CHANGED, i);
  }),
  (Cache.prototype.on_user_changed = function (e) {
    var t = e.jmsg;
    if (0 == t.users.length) return;
    let r = new Array();
    for (let e = 0; e < t.users.length; e++) {
      let s = t.users[e];
      this.current_user.uid === s.uid &&
        ((this.current_user = s), this.reset_crrent_userinfo()),
        this.user_map.set(s.uid, s),
        r.push(s.uid),
        this.refresh_memberlist_by_userchanged(s);
    }
    let s = new Object();
    (s.n_users = t.users.length),
      (s.uids = r),
      this.ctx.notify_cb(EVENT_STATUS.NOTICE_USER_CHANGED, s);
  }),
  (Cache.prototype.on_member_changed = function (e) {
    var t = e.jmsg;
    if (this.group_map.has(t.gid)) {
      let e = this.group_map.get(t.gid);
      (e.online.memberCount = t.online.memberCount),
        (e.online.memberIngroup = t.online.memberIngroup);
    } else if (this.enterprise_group_map.has(t.gid)) {
      let e = this.enterprise_group_map.get(t.gid);
      (e.group.online.memberCount = t.online.memberCount),
        (e.group.online.memberIngroup = t.online.memberIngroup);
    } else
      this.out_list_group &&
        this.out_list_group.gid == t.gid &&
        ((this.out_list_group.online.memberCount = t.online.memberCount),
        (this.out_list_group.online.memberIngroup = t.online.memberIngroup));
    let r = {
      gid: "",
      update_uids: [],
      update_count: 0,
      rm_uids: [],
      rm_count: 0,
      joined_uids: [],
      joined_count: 0,
      left_uids: [],
      left_count: 0,
      online: { memberCount: 0, memberIngroup: 0 },
    };
    (r.gid = t.gid),
      (r.online.memberCount = t.online.memberCount),
      (r.online.memberIngroup = t.online.memberIngroup);
    let s = !1;
    if (t.updatedMembers && t.updatedMembers.length) {
      (s = !0),
        this.add_members(t.gid, t.updatedMembers, t.updatedMembers.length),
        (r.update_count = t.updatedMembers.length);
      for (let e = 0; e < t.updatedMembers.length; e++)
        r.update_uids.push(t.updatedMembers[e].user.uid);
    }
    if (t.rm && t.rm.length) {
      s = !0;
      let e = this.member_map.get(t.gid);
      for (let r = 0; r < t.rm.length; r++)
        for (let s = 0; s < e.length; s++)
          e[s].user.uid == t.rm[r] && e.splice(s, 1);
      r.rm_count = t.rm.length;
      for (let e = 0; e < t.rm.length; e++) r.rm_uids.push(t.rm[e]);
    }
    if (t.joined && t.joined.length) {
      if (this.member_map.has(t.gid)) {
        let e = this.member_map.get(t.gid);
        for (let s = 0; s < t.joined.length; s++) {
          for (let r = 0; r < e.length; r++)
            if (e[r].user.uid === t.joined[s]) {
              e[r].ingroup = !0;
              break;
            }
          r.joined_uids.push(t.joined[s]);
        }
        r.joined_count = t.joined.length;
      } else if (this.enterprise_group_map.has(t.gid)) {
        let e = this.enterprise_group_map.get(t.gid).members;
        for (let s = 0; s < t.joined.length; s++) {
          for (let r = 0; r < e.length; r++)
            if (e[r].user.uid === t.joined[s]) {
              e[r].ingroup = !0;
              break;
            }
          r.joined_uids.push(t.joined[s]);
        }
        r.joined_count = t.joined.length;
      }
      s = !0;
    }
    if (t.left && t.left.length)
      if (((s = !0), this.member_map.has(t.gid))) {
        let e = this.member_map.get(t.gid);
        for (let s = 0; s < t.left.length; s++) {
          for (let r = 0; r < e.length; r++)
            if (e[r].user.uid === t.left[s]) {
              e[r].ingroup = !1;
              break;
            }
          r.left_uids.push(t.left[s]);
        }
        r.left_count = t.left.length;
      } else if (this.enterprise_group_map.has(t.gid)) {
        let e = this.enterprise_group_map.get(t.gid).members;
        for (let s = 0; s < t.left.length; s++) {
          for (let r = 0; r < e.length; r++)
            if (e[r].user.uid === t.left[s]) {
              e[r].ingroup = !1;
              break;
            }
          r.left_uids.push(t.left[s]);
        }
        r.left_count = t.left.length;
      }
    if (s) {
      let e = new Object();
      (e.gid = t.gid),
        (e.changed_info = r),
        this.ctx.notify_cb(EVENT_STATUS.NOTICE_MEMBERS_CHANGED, e);
    }
  }),
  (Cache.prototype.on_group_changed = function (e) {
    let t = e.jmsg;
    this.group_map.set(t.group.gid, t.group);
    let r = new Object();
    (r.gid = t.group.gid),
      (r.type = t.group.type),
      this.log(
        1,
        "on_group_changed",
        " type:" + t.group.type + "gid:" + t.group.gid
      ),
      t.group.type === GROUP_TYPE.GROUP_SESSION &&
        ((r.session_status = t.group.session.status),
        this.log(
          1,
          "on_group_changed",
          " event.session_status:" + r.session_status
        )),
      this.ctx.notify_cb(EVENT_STATUS.NOTICE_GROUP_CHANGED, r);
  }),
  (Cache.prototype.on_group_list_changed = function (e) {
    let t = e.jmsg,
      r = {
        count: 0,
        updated: [],
        updated_count: 0,
        removed: [],
        removed_count: 0,
      };
    if (
      (null == t.updateGroups && (t.updateGroups = []),
      null == t.rmGroups && (t.rmGroups = []),
      (r.count = t.rmGroups.length + t.updateGroups.length),
      t.rmGroups.length)
    ) {
      for (let e = 0; e < t.rmGroups.length; e++) {
        let s = t.rmGroups[e];
        this.group_map.has(s) && this.group_map.delete(s),
          null != this.current_group &&
            s === this.current_group.gid &&
            (this.current_group = null),
          r.removed.push(s),
          this.del_gruntime(s);
      }
      r.removed_count = t.rmGroups.length;
    }
    if (t.updateGroups.length) {
      let e = new Array();
      for (let s = 0; s < t.updateGroups.length; s++) {
        let i = t.updateGroups[s];
        this.group_map.set(i.gid, i),
          i.type === GROUP_TYPE.GROUP_SESSION && e.push(i.gid),
          r.updated.push(i.gid);
      }
      r.updated_count = t.updateGroups.length;
      for (let t = 0; t < e.length; t++)
        console.log(" GROUOP_SESSION query members gid: ", e[t]),
          this.ctx.connection.query_members(e[t]);
    }
    let s = new Object();
    (s.total = t.rmGroups.length + t.updateGroups.length),
      (s.changed_info = r),
      this.ctx.notify_cb(EVENT_STATUS.NOTICE_GROUPS_CHANGED, s);
  }),
  (Cache.prototype.on_current_group = function (e) {
    let t = e.jmsg;
    if (null == t.gruntime || null == t.gruntime.group) return;
    t.gruntime.group.type !== GROUP_TYPE.GROUP_SESSION &&
      (this.last_gid = t.gruntime.gid);
    let r = t.gruntime.group,
      s = !1,
      i = 0,
      o = 0;
    this.add_gruntime(t.gruntime);
    let n = this.get_group_by_gid_self(r.gid);
    null !== n
      ? ((i = n.session.begin_time),
        (o = n.session.end_time),
        this.group_map.delete(r.gid))
      : (s = !0),
      0 === r.session.begin_time && (r.session.begin_time = i),
      0 === r.session.end_time && (r.session.end_time = o),
      (this.current_group = r),
      s
        ? (this.out_list_group && (this.out_list_group = null),
          (this.out_list_group = r))
        : this.group_map.set(r.gid, r),
      this.ctx.connection.query_members(r.gid);
  }),
  (Cache.prototype.on_contact_changed_message = function (e) {}),
  (Cache.prototype.on_update_token_ack_message = function (e) {}),
  (Cache.prototype.on_query_listen_group_ack = function (e) {
    let t = e.jmsg;
    if (null != t.groups && 0 !== t.groups.length) {
      this.watch_group_map.clear();
      for (let e = 0; e < t.groups.length; e++)
        this.watch_group_map.set(t.groups[e].gid, t.groups[e]);
      this.ctx.notify_cb(EVENT_STATUS.NOTICE_LISTEN_GROUP_UPDATE, null);
    }
  }),
  (Cache.prototype.on_listen_group_ack = function (e) {
    let t = e.jmsg;
    if ("SUCCESS" !== e.result) return;
    let r = t.gruntime.group,
      s = 0,
      i = 0;
    this.add_gruntime(t.gruntime);
    let o = this.get_group_by_gid_self(r.gid);
    null !== o && ((s = o.session.begin_time), (i = o.session.end_time)),
      0 === r.session.begin_time && (r.session.begin_time = s),
      0 === r.session.end_time && (r.session.end_time = i),
      this.watch_group_map.set(r.gid, r);
    let n = new Object();
    (n.gid = r.gid),
      this.ctx.notify_cb(EVENT_STATUS.NOTICE_SESSIONSET_LISTEN_GROUP_ACK, n);
  }),
  (Cache.prototype.on_unlisten_group_ack = function (e) {
    if ("SUCCESS" !== e.jmsg.result) return;
    let t = e.jmsg;
    t.gid &&
      this.watch_group_map.has(t.gid) &&
      (this.watch_group_map.delete(t.gid),
      this.ctx.notify_cb(EVENT_STATUS.NOTICE_LISTEN_GROUP_UPDATE, null));
  }),
  (Cache.prototype.on_response_session_ack = function (e) {
    let t = e.jmsg;
    if (null === this.get_member_by_uid(t.gid, this.current_user.uid)) return;
    let r = this.member_map.get(t.gid),
      s = this.current_user.uid;
    for (let e = 0; e < r.length; e++)
      if (s == r[e].user.uid) {
        r[e].ms.response = t.accept;
        break;
      }
  }),
  (Cache.prototype.refresh_memberlist_by_userchanged = function (e) {
    let t = !1;
    this.user_map.has(e.uid) && this.user_map.set(e.uid, e);
    for (let [r, s] of this.member_map) {
      let i = s,
        o = r;
      t = !1;
      for (let r = 0; r < i.length; r++)
        i[r].user.uid === e.uid && ((i[r].user = e), (t = !0));
      t && this.member_map.set(o, i);
    }
    this.enterprise_user_map.has(e.uid) &&
      this.enterprise_user_map.set(e.uid, e);
    for (let [r, s] of this.enterprise_group_map) {
      let r = s.members;
      for (let s = 0; s < r.length; s++)
        if (r[s].uid === e.uid) {
          (r[s].user = e), (t = !0);
          break;
        }
      if (t) break;
    }
  }),
  (Cache.prototype.add_members = function (e, t, r) {
    console.log(e, t, r, "修改前"),
      this.member_map.has(e) || this.member_map.set(e, []);
    for (let s = 0; s < r; s++) {
      let r = t[s];
      this.del_member(e, r.user.uid),
        this.insert_member(e, r),
        this.user_map.set(r.user.uid, r.user);
    }
  });
let sort = 0;
function Gruntime() {
  [
    { id: 1, name: "Event A", timestamp: 169651488e4 },
    { id: 2, name: "Event B", timestamp: 1694739e6 },
    { id: 3, name: "Event C", timestamp: 16999935e5 },
  ].sort((e, t) => t.timestamp - e.timestamp);
}
(Cache.prototype.del_member = function (e, t) {
  if (this.member_map.has(e)) {
    let r = this.member_map.get(e);
    for (let e = 0; e < r.length; e++)
      if (r[e].user.uid === t) return (sort = e), void r.splice(e, 1);
  }
}),
  (Cache.prototype.insert_member = function (e, t) {
    if (this.member_map.has(e)) {
      let r = this.member_map.get(e);
      r.splice(sort, 0, t), this.member_map.set(e, r);
    }
  }),
  (Cache.prototype.add_gruntime = function (e) {
    let t = new Gruntime();
    (t.domain = e.domain),
      (t.wsport = e.wsport),
      this.gruntime_map.set(e.group.gid, e);
  }),
  (Cache.prototype.del_gruntime = function (e) {
    this.gruntime_map.has(e) && this.gruntime_map.delete(e);
  }),
  (Cache.prototype.reset_crrent_userinfo = function () {
    console.log("存储登录信息1");
    sessionStorage.setItem("slsdk_userinfo", JSON.stringify(this.current_user));
  });
export default Cache;
