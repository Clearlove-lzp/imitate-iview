var Translator = function (pocsdk) {
  (this.pocsdk = pocsdk),
    (this.trans_user = function (s) {
      var d = new proto.ui.act.User();
      s.online && 1 !== s.online ? (s.online = 3) : s.online || (s.online = 1),
        d.setUid(s.uid),
        d.setName(s.name),
        d.setOnline(s.online),
        d.setAudioenabled(s.audioEnabled),
        d.setSleep(!1),
        d.setDnd(!1),
        d.setHasgid(!1),
        d.setGid(s.configure.defaultGroup),
        d.setRole(s.role),
        d.setLocon(s.configure.location),
        d.setLocperiod(s.configure.locationPeriod),
        d.setAccount(s.account),
        d.setAvatar(s.avatar),
        d.setSex(0),
        d.setEmail(s.email),
        d.setPhone(s.phone),
        d.setImei(null),
        d.setDevicetype(),
        d.setChatenabled(s.chatenabled || !0);
      let conf = (function (r) {
        let config = new proto.ui.act.UserConfigure();
        return (
          config.setDefaultgroup(r.defaultGroup),
          config.setLocationperiod(r.locationPeriod),
          config.setLocation(r.location),
          config.setLocationmodel(r.locationModel),
          config.setAllowinvite(r.allowInvite),
          config.setAllowinvited(r.allowInvited),
          config.setAllowsendbroadcast(r.allowSendBroadcast),
          config.setAllowviewvideo(r.allowViewVideo),
          config.setAutoanswer(r.autoAnswer),
          config.setAudioenabled(r.audioEnabled),
          config.setDevinfoenabled(r.devinfoEnabled),
          config.setVideoupmodel(r.videoUpModel),
          config.setPingStatus(r.pingStatus),
          config.setPingDuration(r.pingDuration),
          config
        );
      })(s.configure);
      return d.setConfigure(conf), d;
    }),
    (this.group_list = function (s) {
      var d = new proto.ui.act.Group();
      d.setGid(s.gid),
        d.setName(s.name),
        d.setType(this.trans_group_type(s.type)),
        d.setCreator(s.creator),
        d.setPriority(s.priority),
        d.setMaxmembers(s.maxMembers),
        d.setStatus(0);
      let online = (function (r) {
        let config = new proto.ui.act.GroupMemberOnlineInfo();
        return (
          config.setCount(r.memberCount),
          config.setIngroup(r.memberIngroup),
          config
        );
      })(s.online);
      d.setOnline(online),
        d.setAudioenabled(s.audioEnabled),
        d.setNeedconfirm(s.needConfirm),
        d.setBegin(s.session.beginTime),
        d.setEnd(s.session.endTime),
        d.setDndenabled(s.dndEnabled),
        d.setLocking(s.locking),
        d.setCreatortype(s.creatorType);
      let session = (function (r) {
        let status = 0,
          config = new proto.ui.act.GroupSession();
        ("IDLE" != r.status && 0 != r.status) || (status = 0);
        ("CALLING" != r.status && 1 != r.status) || (status = 1);
        ("CONNECTED" != r.status && 2 != r.status) || (status = 2);
        (" DISCONNECTED" != r.status && 3 != r.status) || (status = 3);
        return (
          config.setStatus(status),
          config.setBegintime(r.beginTime),
          config.setEndtime(r.endTime),
          config.setCmsg(r.msg),
          config.setInviter(r.inviter),
          config.setTemp(r.temp),
          config
        );
      })(s.session);
      return (
        d.setSession(session),
        d.setMaxspeechsecond(s.maxSpeechSecond),
        d.setDesc(s.desc),
        d.setCreatetime(s.createTime),
        d.setNameflag(s.nameflag),
        d.setIslarge(s.isLarge),
        d
      );
    }),
    (this.MemberSession = function (s) {
      var d = new proto.ui.act.MemberSession();
      return (
        d.setResponse(s.response),
        d.setConfirmed(s.confirmed),
        d.setDeleted(s.deleted),
        d
      );
    }),
    (this.member = function (s) {
      var d = new proto.ui.act.Member();
      d.setUser(this.trans_user(s.user)), d.setIngroup(s.ingroup);
      let data = this.MemberSession(s.ms);
      return (
        d.setMs(data),
        d.setPriority(s.priority),
        d.setLimitspeech(s.limitSpeechSecond),
        d.setTop(s.top),
        d
      );
    }),
    (this.GroupMembersAll = function (s) {
      let d = new proto.ui.act.GroupMembersAll(),
        data = this.group_list(s.group);
      d.setGroup(data), d.setMembercount(s.members.length);
      let arr = [],
        k = {};
      for (let i = 0; i < s.members.length; i++)
        (k = this.member(s.members[i])), arr.push(k);
      return d.setMembersList(arr), d;
    }),
    (this.GroupMembersAlls = function (group) {
      let d = new proto.ui.act.GroupMembersAll(),
        data = this.group_list(group);
      d.setGroup(data);
      let members = this.pocsdk.client.get_member_list(group.gid);
      if (members) {
        d.setMembercount(members.length);
        let arr = [];
        for (let i = 0; i < members.length; i++) {
          let mem = this.member(members[i]);
          arr.push(mem);
        }
        d.setMembersList(arr);
      }
      return d;
    });
};
(Translator.prototype.trans_group_type = function (in_type) {
  let type = 1;
  return (
    "STATIC" == in_type || 1 == in_type
      ? (type = 1)
      : "SESSION" == in_type || 5 == in_type
      ? (type = 5)
      : "TEMP" == in_type || 2 == in_type
      ? (type = 2)
      : "CONTACT" == in_type || 3 == in_type
      ? (type = 3)
      : "CHECKIN" == in_type || 4 == in_type
      ? (type = 4)
      : console.log("unknown type:", in_type),
    type
  );
}),
  (Translator.prototype.groupInfo_ack = function (param) {
    var d = new proto.ui.act.GetGroupByGidAck();
    if ((d.setResult(param.result), 0 == param.result)) {
      const data = this.group_list(param.group);
      d.setGroup(data);
    }
    return d;
  }),
  (Translator.prototype.userPrecedence_ack = function (result) {
    var d = new proto.ui.act.SetUsersPriorityAck();
    return d.setResult(0), d;
  }),
  (Translator.prototype.leaveGroup_ack = function (result, token) {
    var d = new proto.ui.act.LeaveGroupAck();
    return d.setResult(0), d;
  }),
  (Translator.prototype.connect_ack = function (result, token) {
    var d = new proto.ui.act.ConnectAck();
    return d.setResult(result), d.setToken(token), d;
  }),
  (Translator.prototype.disconnect_ack = function (result) {
    var d = new proto.ui.act.DisconnectAck();
    return d.setResult(result), d;
  }),
  (Translator.prototype.HistorySpeech_ack = function (result) {
    var params = result.param;
    params = params.replace(/"msgTime":(\d+)/g, '"msgTime":"$1"');
    params = params.replace(/"receiver":(\d+)/g, '"receiver":"$1"');
    params = JSON.parse(params);
    console.log("translator res", params);
    var d = new proto.ui.act.TalkbackHistoryRecordAck();
    let data = params.data;
    if (data.length < 1) {
      d.setResult(0);
      d.setAudiorecordList([]);
      return d;
    }
    let arr = [];
    let msg = "";
    console.log("translator data", data);

    for (let i = 0; i < data.length; i++) {
      var a = new proto.ui.act.AudioRecord();
      a.setId(data[i].id);
      a.setType(data[i].type);
      a.setTime(data[i].time);
      a.setSender(data[i].sender);
      a.setReceiver(data[i].receiver);
      a.setSpeechtime(data[i].speechtime);
      a.setReceivertype(data[i].receivertype);
      msg = data[i].body;
      msg = msg.replace(/"sid":(\d+)/, '"sid":"$1"');
      msg = msg.replace(/"gid":(\d+)/, '"gid":"$1"');
      msg = msg.replace(/"startTime":(\d+)/, '"startTime":"$1"');
      msg = msg.replace(/"stopTime":(\d+)/, '"stopTime":"$1"');
      msg.replace(/\"sid\":(\d+)/g, '"sid":"$1"');
      msg = JSON.parse(msg);
      console.log("---msg转换前", msg);
      // let body = data[i].body
      // console.log('---msg转换后',body)

      var b = new proto.ui.act.AudioRecordBody();
      b.setSid(msg.sid);
      b.setUid(msg.uid);
      b.setGid(msg.gid);
      b.setStarttime(msg.startTime);
      b.setStoptime(msg.stopTime);
      b.setPayload(msg.payload);
      b.setDuration(msg.duration);
      a.setBody(b);
      arr.push(a);
    }

    d.setResult(0);
    d.setAudiorecordList(arr);

    return d;
  }),
  (Translator.prototype.GetGroupMembers_ack = function (gid) {
    var d = new proto.ui.act.GetCurrentGroupMembersAck();
    let members = this.pocsdk.client.get_member_list(gid);
    if ((console.log(members, gid, "----members"), null == members)) return;
    d.setResult(0), d.setGid(gid), d.setTotal(members.length), d.setOnline(0);
    let arr = [];
    for (let i = 0; i < members.length; i++) {
      "0" == members[i].user.configure.defaultGroup &&
        (members[i].user.configure.defaultGroup = gid);
      let data = this.member(members[i]);
      arr.push(data);
    }
    return d.setMmsList(arr), d;
  }),
  (Translator.prototype.GetAllSession_ack = function () {
    var d = new proto.ui.act.GetAllSessionAck();
    let data = this.pocsdk.client.get_temporary_group_list();
    if ((console.log(data, "---groups修改前"), null == data)) return d;
    let groups = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < groups.length; i++)
      "SESSION" == groups[i].type && (groups[i].type = 5),
        "IDLE" == groups[i].session.status && (groups[i].session.status = 0),
        "CALLING" == groups[i].session.status && (groups[i].session.status = 1),
        "CONNECTED" == groups[i].session.status &&
          (groups[i].session.status = 2),
        " DISCONNECTED" == groups[i].session.status &&
          (groups[i].session.status = 3);
    d.setResult(0);
    let arr = [];
    for (let i = 0; i < groups.length; i++) {
      let data = this.GroupMembersAlls(groups[i]);
      arr.push(data);
    }
    return d.setDataList(arr), d;
  }),
  (Translator.prototype.GetGroupsList_ack = function (result) {
    console.log(result, "---groups修改后");
    var d = new proto.ui.act.GetGroupsListAck();
    let data = {},
      arr = [];
    for (let i = 0; i < result.length; i++)
      (data = this.group_list(result[i])), arr.push(data);
    return d.setResult(0), d.setGroupsList(arr), d;
  }),
  (Translator.prototype.GetQueryUid_Ack = function (result) {
    let user = this.pocsdk.client.get_user(result.uid);
    var d = new proto.ui.act.GetQueryUidAck();
    if (null == user) d.setResult(-1);
    else {
      d.setResult(0);
      let data = this.trans_user(user);
      d.setUser(data);
    }
    return d;
  }),
  (Translator.prototype.GetCurrentUser_ack = function (result) {
    let current_user = new proto.ui.act.GetCurrentUserAck(),
      users = this.trans_user(result);
    return current_user.setResult(0), current_user.setUser(users), current_user;
  }),
  (Translator.prototype.login_ack = function (result, user) {
    var d = new proto.ui.act.LoginAck();
    d.setResult(result);
    var u = this.trans_user(user);
    return d.setUser(u), d;
  }),
  (Translator.prototype.enterGroup_ack = function (result) {
    var d = new proto.ui.act.EnterGroupAck();
    return d.setResult(0), d;
  }),
  (Translator.prototype.SetGroupSpeakTime = function (result) {
    var d = new proto.ui.push.SetGroupMaxSpeechTimeAck();
    console.log(
      "timeack",
      d.setGid(result.gid),
      d.setDuration(result.duration)
    );
    return d.setGid(result.gid), d.setDuration(result.duration), d;
  }),
  (Translator.prototype.getCurrentGroupGid_ack = function (result) {
    var d = new proto.ui.act.GetCurrentGroupGidAck();
    if ((d.setGid(result.gid), "" != result.gid)) {
      d.setResult(0);
      let group = this.pocsdk.client.get_group_by_gid(result.gid),
        u = this.group_list(group);
      d.setGroup(u);
    } else d.setResult(-1);
    return d;
  }),
  (Translator.prototype.current_group_ack = function (status) {
    var d;
    if (0 == status.gid || status.groups == {})
      return (d = new proto.ui.act.GetCurrentGroupGidAck()).setResult(0), d;
    (d = new proto.ui.act.GetCurrentGroupGidAck()).setResult(0),
      d.setGid(status.gid);
    var u = this.group_list(status.gruntime.group);
    return d.setGroup(u), d;
  }),
  (Translator.prototype.getenteriselist_ack = function (param) {
    var d = new proto.ui.act.QueryEnterpriseGroupListAck();
    d.setResult(0);
    let arr = [],
      data = {};
    for (let i = 0; i < param.length; i++)
      (data = this.GroupMembersAll(param[i])), arr.push(data);
    return d.setEnterprisegroupsList(arr), d;
  }),
  (Translator.prototype.error = function (error, reason) {
    var d = new proto.ui.push.ErrorMessage();
    return d.setError(error), d.setReason(reason), d;
  }),
  (Translator.prototype.current_group_changed = function (param) {
    var msg = new proto.ui.push.CurrentGroupChanged();
    if ("0" != param.gid && "" != param.gid) {
      msg.setGid(param.gid);
      let msg_group = this.group_list(param.groups);
      msg.setGroups(msg_group);
    } else msg.setGid("0");
    return msg;
  }),
  (Translator.prototype.push_on_member_changed = function (status) {
    var d = new proto.ui.push.MemberChanged();
    return (
      d.setGid(status.gid),
      d.setJoinedList(status.joined || []),
      d.setUpdatedList(status.updated || []),
      d.setLeftList(status.left || []),
      d.setRmedList(status.remd || []),
      d
    );
  }),
  (Translator.prototype.transfer_members_changed = function (members_changed) {
    let d = new proto.ui.push.MemberChanged();
    if ((d.setGid(members_changed.gid), members_changed.update_count > 0)) {
      let update_members = [];
      for (let i = 0; i < members_changed.update_count; i++) {
        let msg_member = new proto.ui.push.Member(),
          member = this.pocsdk.client.get_member_by_uid(
            members_changed.gid,
            members_changed.update_uids[i]
          );
        if (member) {
          msg_member.setIngroup(member.ingroup),
            msg_member.setPriority(member.priority),
            msg_member.setTop(member.top),
            member.ingroup_name
              ? msg_member.setIngroupname(member.ingroup_name)
              : msg_member.setIngroupname(""),
            msg_member.setLimitspeech(0);
          let user = this.trans_user(member.user);
          msg_member.setUser(user), update_members.push(msg_member);
        }
      }
      d.setUpdatedList(update_members);
    }
    if (members_changed.rm_count > 0) {
      let rm_members = [];
      for (let i = 0; i < members_changed.rm_count; i++) {
        let user = this.pocsdk.client.get_user(members_changed.rm_uids[i]);
        if ((console.log(user, "user---"), user)) {
          let msg_member = new proto.ui.push.Member();
          msg_member.setIngroup(!1), msg_member.setIngroupname("");
          let users = this.trans_user(user);
          msg_member.setUser(users), rm_members.push(msg_member);
        }
      }
      d.setRmedList(rm_members);
    }
    if (members_changed.joined_count > 0) {
      let joined_members = [];
      for (let i = 0; i < members_changed.joined_count; i++) {
        let msg_member = new proto.ui.push.Member(),
          member = this.pocsdk.client.get_member_by_uid(
            members_changed.gid,
            members_changed.joined_uids[i]
          );
        if (member) {
          msg_member.setIngroup(!0),
            msg_member.setPriority(member.priority),
            msg_member.setTop(member.top),
            member.ingroup_name
              ? msg_member.setIngroupname(member.ingroup_name)
              : msg_member.setIngroupname(""),
            msg_member.setLimitspeech(0);
          let user = this.trans_user(member.user);
          msg_member.setUser(user), joined_members.push(msg_member);
        }
      }
      d.setJoinedList(joined_members);
    }
    if (members_changed.left_count > 0) {
      let left_members = [];
      for (let i = 0; i < members_changed.left_count; i++) {
        let msg_member = new proto.ui.push.Member(),
          member = this.pocsdk.client.get_member_by_uid(
            members_changed.gid,
            members_changed.left_uids[i]
          );
        if (member) {
          msg_member.setIngroup(!1),
            msg_member.setPriority(member.priority),
            msg_member.setTop(member.top),
            member.ingroup_name
              ? msg_member.setIngroupname(member.ingroup_name)
              : msg_member.setIngroupname(""),
            msg_member.setLimitspeech(0);
          let user = this.trans_user(member.user);
          msg_member.setUser(user), left_members.push(msg_member);
        }
      }
      d.setLeftList(left_members);
    }
    return d;
  }),
  (Translator.prototype.user_status_changed = function (status) {
    var d = new proto.ui.push.OnlineStatusChanged();
    return d.setStatus(status), d;
  }),
  (Translator.prototype.UserStatusChanged = function (status) {
    console.log(status, "---usersList");
    var d = new proto.ui.push.UserStatusChanged();
    d.setCount(status.total);
    let arr = [];
    for (let i = 0; i < status.uids.length; i++) {
      let user = this.pocsdk.client.get_user(status.uids[i]);
      arr.push(this.trans_user(user));
    }
    return console.log(arr, "---arr"), d.setUsersList(arr), d;
  }),
  (Translator.prototype.listSessionAck = function (status) {
    console.log(status, "---status");
    var d = new proto.ui.act.GrouplistSessionAck();
    d.setResult(0);
    let arr = [];
    for (let i = 0; i < status.length; i++)
      arr.push(this.group_list(status[i]));
    return d.setGroupsList(arr), d;
  });
export default Translator;
