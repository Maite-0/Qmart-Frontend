class Comment {
  final int id;
  final String name;
  final String content;
  final DateTime createdAt;
  final List<Reply> replies;

  Comment({
    required this.id,
    required this.name,
    required this.content,
    required this.createdAt,
    required this.replies,
  });

  factory Comment.fromJson(Map<String, dynamic> json) {
    var repliesFromJson = json['replies'] as List? ?? [];
    List<Reply> replyList =
        repliesFromJson.map((i) => Reply.fromJson(i)).toList();

    return Comment(
      id: json['id'],
      name: json['name'] ?? 'Unknown',
      content: json['comment'] ?? '',
      createdAt: DateTime.parse(json['created_at']),
      replies: replyList,
    );
  }
}

class Reply {
  final int id;
  final String? fanName;
  final String fanReply;
  final DateTime createdAt;

  Reply({
    required this.id,
    required this.fanName,
    required this.fanReply,
    required this.createdAt,
  });

  factory Reply.fromJson(Map<String, dynamic> json) {
    return Reply(
      id: json['reply_id'] ?? 0,
      fanName: json['fan_name'],
      fanReply: json['fan_reply'] ?? '',
      createdAt:
          DateTime.parse(json['reply_created_at'] ?? '1970-01-01T00:00:00Z'),
    );
  }
}
